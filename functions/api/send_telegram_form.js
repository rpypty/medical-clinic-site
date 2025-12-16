export async function onRequest({ request, env }) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const name = (payload?.name || "").trim();
  const phone = (payload?.phone || "").trim();
  const service = (payload?.service || "").trim();
  const comment = (payload?.comment || "").trim();

  if (!name || !phone || !service) {
    return new Response("Missing required fields", { status: 400 });
  }

  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return new Response("Telegram configuration missing", { status: 500 });
  }

  const text = [
    "<b>Новая заявка с сайта</b>",
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Услуга: ${service}`,
    comment ? `Комментарий: ${comment}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const telegramUrl = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;

  const telegramResponse = await fetch(telegramUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text, parse_mode: "HTML" }),
  });

  if (!telegramResponse.ok) {
    const errorText = await telegramResponse.text();
    return new Response(errorText || "Telegram request failed", { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
