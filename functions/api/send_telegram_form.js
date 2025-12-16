const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // лучше заменить на свой домен
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function onRequest({ request, env }) {
  // Preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400, headers: corsHeaders });
  }

  const name = (payload?.name || "").trim();
  const phone = (payload?.phone || "").trim();
  const service = (payload?.service || "").trim();
  const comment = (payload?.comment || "").trim();

  if (!name || !phone || !service) {
    return new Response("Missing required fields", { status: 400, headers: corsHeaders });
  }

  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    // Это почти наверняка будет, если vars не заданы в Preview/Prod
    return new Response("Telegram configuration missing", { status: 500, headers: corsHeaders });
  }

  const text = [
    "<b>Новая заявка с сайта</b>",
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Услуга: ${service}`,
    comment ? `Комментарий: ${comment}` : "",
  ].filter(Boolean).join("\n");

  const telegramUrl = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;

  // Таймаут на запрос к Telegram
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 8000);

  try {
    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: controller.signal,
    });

    if (!telegramResponse.ok) {
      const errorText = await telegramResponse.text();
      console.log("Telegram error:", telegramResponse.status, errorText);
      return new Response("Telegram request failed", { status: 502, headers: corsHeaders });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (e) {
    console.log("Fetch to Telegram failed:", e?.message || e);
    return new Response("Upstream request failed", { status: 502, headers: corsHeaders });
  } finally {
    clearTimeout(t);
  }
}
