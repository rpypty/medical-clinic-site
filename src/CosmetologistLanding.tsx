import { useState } from "react";
import {
  Phone,
  Calendar,
  MapPin,
  Sparkles,
  Mail,
  ArrowRight,
  Instagram,
  CheckCircle2,
  ShieldCheck,
  GraduationCap,
  Clock3,
  Send,
} from "lucide-react";

const services = [
  {
    title: "Очищение кожи",
    description: "Механическая, ультразвуковая, комбинированная, атравматическая — подбор по состоянию кожи.",
    price: "от 110 BYN",
    image: "/images/service-cleansing.jpg",
  },
  {
    title: "Обновление кожи",
    description: "Azelac peel, ZK face peel, Peach peel, salicylic/orange peel — мягко выравниваем тон и текстуру.",
    price: "от 180 BYN",
    image: "/images/service-peel.jpg",
  },
  {
    title: "Лечение кожи",
    description: "Комплексные протоколы для акне, постакне, гиперпигментации, купероза, anti-age.",
    price: "индивидуально",
    image: "/images/service-therapy.jpg",
  },
  {
    title: "Уходовые процедуры",
    description: "Авторские spa-программы, восстанавливающие маски, массаж лица и шеи, гидратация.",
    price: "от 130 BYN",
    image: "/images/service-care.jpg",
  },
  {
    title: "Аппаратные процедуры",
    description: "Geneo+ и другие технологии для омоложения, лифтинга и улучшения качества кожи.",
    price: "от 220 BYN",
    image: "/images/service-device.jpg",
  },
  {
    title: "Лечение волос",
    description: "Подбор ухода для кожи головы, укрепление луковиц, курсы для профилактики выпадения.",
    price: "от 150 BYN",
    image: "/images/service-hair.jpg",
  },
];

const education: string[] = [
  "Серебряный призер WorldSkills Belarus 2018 (прикладная эстетика).",
  "УО «Борисовский государственный медицинский колледж» — косметический уход и основы визажа (2016).",
  "ЧУО «УЦ эстетики и массажа Натальи Антонович» — косметик 4/5 разряда, визажист, мастер маникюра/педикюра, технолог SPA (2018–2019).",
  "Почетная грамота за подготовку специалистов индустрии красоты (2019).",
  "DERMACEUTIC LABORATORIE — химические пилинги и космецевтика (2022).",
  "Proderma — актуальные подходы к оздоровлению кожи (2020).",
  "HL — базовое обучение и банкетные процедуры (2020, 2024).",
  "Аппаратная косметология и активные гели SCHALI, анти-акне и гиперпигмент.",
  "Инновационные пилинги THALGO, MARY COHR; нехирургическая подтяжка лица (2018).",
  "HELEO — молекулярно-клеточное очищение для омоложения (2024).",
  "Протоколы «PEACH PEEL»: акне, постакне, гиперпигментация, anti-age (2023).",
  "«BIOGEL» — методики работы с препаратами (2024).",
  "Курс Geneo+ для омоложения и качества кожи (2022).",
  "Конференции и семинары: Star Beauty, Isispharma, Mediderma, BioRePeel (2020–2023).",
];

const beforeAfter = [
  {
    title: "Осветление тона и пор",
    before: "/images/before-after-1-before.jpg",
    after: "/images/before-after-1-after.jpg",
    note: "Нежный пилинг + восстановление барьера, 2 встречи.",
  },
  {
    title: "Успокоение чувствительной кожи",
    before: "/images/before-after-2-before.jpg",
    after: "/images/before-after-2-after.jpg",
    note: "Аппаратная терапия + серум, курс 4 процедуры.",
  },
  {
    title: "Рельеф и сияние",
    before: "/images/before-after-3-before.jpg",
    after: "/images/before-after-3-after.jpg",
    note: "Комбинированная чистка + уход, 1 процедура.",
  },
];

export default function CosmetologistLanding() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim() ?? "";
    const phone = formData.get("phone")?.toString().trim() ?? "";
    const service = formData.get("service")?.toString() ?? "";
    const comment = formData.get("comment")?.toString() ?? "";

    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      setStatus("error");
      setStatusMessage("Добавьте VITE_TELEGRAM_BOT_TOKEN и VITE_TELEGRAM_CHAT_ID в .env.local, чтобы форма отправляла в Telegram.");
      return;
    }

    setStatus("sending");
    setStatusMessage("");

    const text = [
      "<b>Новая заявка с сайта</b>",
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Услуга: ${service}`,
      comment ? `Комментарий: ${comment}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
      });

      if (!response.ok) throw new Error("Telegram request failed");

      setStatus("success");
      setStatusMessage("Заявка отправлена в Telegram. Я свяжусь с вами в ближайшее время.");
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setStatusMessage("Не удалось отправить. Проверьте интернет или ключ бота.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-rose-100 selection:text-rose-900">
      <header className="sticky top-0 z-40 border-b border-zinc-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#hero" className="flex items-center gap-3 font-semibold tracking-tight text-rose-900">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-50 text-rose-700 shadow-inner">
              <Sparkles className="h-5 w-5" />
            </span>
            MEDICADERM CLINIC
          </a>
          <nav className="hidden items-center gap-6 text-sm text-zinc-700 md:flex">
            <a href="#intro" className="hover:text-rose-700">
              Интро
            </a>
            <a href="#about" className="hover:text-rose-700">
              Обо мне
            </a>
            <a href="#services" className="hover:text-rose-700">
              Услуги
            </a>
            <a href="#results" className="hover:text-rose-700">
              До/после
            </a>
            <a href="#contact" className="hover:text-rose-700">
              Запись
            </a>
          </nav>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-rose-700 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-rose-200 transition hover:bg-rose-800"
          >
            <Calendar className="h-4 w-4" />
            Записаться
          </a>
        </div>
      </header>

      <section id="hero" className="relative bg-white">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_520px_at_8%_0%,rgba(244,114,182,0.08),transparent)]" />
        <div className="mx-auto max-w-5xl px-4 py-14 md:py-20">
          <div className="space-y-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 shadow-sm">
              <CheckCircle2 className="h-4 w-4" />
              Сертифицированный косметолог • 8+ лет практики
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-zinc-900 md:text-5xl">
              Естественная красота без эффекта «маски»
            </h1>
            <p className="max-w-3xl text-lg text-zinc-700">
              Я — косметолог в Минске. Мягко и бережно помогаю коже выглядеть здоровой и ухоженной: уходовые процедуры, авторские
              программы лечения кожи, ботулинотерапия, биоревитализация.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-rose-700 px-5 py-3 text-white shadow-md transition hover:bg-rose-800"
              >
                Записаться
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-5 py-3 text-zinc-900 transition hover:bg-zinc-50"
              >
                Смотреть услуги
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-5 text-sm text-zinc-700">
              <span className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +375 (33) 305 3850
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Минск, мед. лицензия
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="intro" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-rose-700">Интро</p>
            <h2 className="font-display text-3xl md:text-4xl text-rose-900">Естественные результаты без гиперкоррекции</h2>
            <p className="text-lg text-zinc-700">
              Моя цель — чтобы кожа выглядела ухоженной, сияющей и здоровой. Работаю деликатно, использую сертифицированные препараты
              и строю программу с учётом диагностики, образа жизни и привычек ухода.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-4">
                <p className="font-medium text-rose-900">Авторские программы</p>
                <p className="text-zinc-600">Комбинирую уход, пилинги и аппаратные методики под задачу.</p>
              </div>
              <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-4">
                <p className="fofnt-medium text-rose-900">Домашний уход</p>
                <p className="text-zinc-600">Подбираю схемы для закрепления результата между визитами.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-[28px] border border-rose-100 bg-rose-50 shadow-xl">
              <img src="/anna_specialist.JPG" alt="Косметолог в халате" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -left-6 -top-6 hidden h-28 w-28 rounded-3xl bg-white/80 backdrop-blur md:flex items-center justify-center shadow-lg shadow-rose-100">
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.12em] text-rose-600">Работаю</p>
                <p className="text-2xl font-semibold text-rose-900">с 2017</p>
                <p className="text-xs text-zinc-500">более 1200 процедур</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-gradient-to-b from-white via-rose-50/40 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-rose-700">Обо мне</p>
              <h3 className="font-display text-3xl text-rose-900 md:text-4xl">Образование и курсы</h3>
            </div>
            <div className="flex items-center gap-3 text-sm text-rose-800">
              <GraduationCap className="h-5 w-5" />
              Постоянно повышаю квалификацию, выбираю доказательные методики.
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {education.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-rose-100 bg-white/80 p-4 shadow-[0_10px_35px_-24px_rgba(0,0,0,0.35)]">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-700" />
                <p className="text-sm text-zinc-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-zinc-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-rose-200">Услуги</p>
              <h3 className="font-display text-3xl md:text-4xl text-white">Выберите программу</h3>
              <p className="mt-2 max-w-2xl text-zinc-300">
                Стоимость зависит от показаний и препаратов. Включены консультация, диагностика кожи и рекомендации по домашнему уходу.
              </p>
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-rose-300/80 px-4 py-2 text-rose-100 transition hover:bg-rose-100 hover:text-zinc-950">
              Записаться на диагностику <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/5 p-1 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.8)]"
              >
                <div
                  className="relative h-40 overflow-hidden rounded-2xl bg-gradient-to-br from-rose-100/50 via-zinc-900/20 to-zinc-900/60"
                  style={{
                    backgroundImage: service.image
                      ? `linear-gradient(120deg, rgba(12,10,9,0.35), rgba(12,10,9,0.1)), url('${service.image}')`
                      : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), transparent 45%)" }} />
                </div>
                <div className="space-y-3 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-lg font-semibold text-white">{service.title}</h4>
                    <span className="rounded-full bg-rose-100/20 px-3 py-1 text-xs font-semibold text-rose-100">{service.price}</span>
                  </div>
                  <p className="text-sm text-zinc-200">{service.description}</p>
                  <button className="inline-flex items-center gap-2 text-sm font-medium text-rose-100 transition hover:text-white" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                    Записаться <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="results" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-rose-700">До / После</p>
            <h3 className="font-display text-3xl text-rose-900 md:text-4xl">Результаты пациентов</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <ShieldCheck className="h-5 w-5 text-rose-700" />
            Фото без фильтров, с согласия клиентов.
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {beforeAfter.map((item) => (
            <div key={item.title} className="overflow-hidden rounded-[24px] border border-rose-100 bg-white shadow-[0_18px_40px_-26px_rgba(0,0,0,0.45)]">
              <div className="grid grid-cols-2">
                <div
                  className="relative aspect-[4/5] bg-rose-50"
                  style={{
                    backgroundImage: item.before ? `url('${item.before}')` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-rose-900 shadow">До</span>
                </div>
                <div
                  className="relative aspect-[4/5] bg-rose-100"
                  style={{
                    backgroundImage: item.after ? `url('${item.after}')` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <span className="absolute left-3 top-3 rounded-full bg-rose-700 px-3 py-1 text-xs font-semibold text-white shadow">После</span>
                </div>
              </div>
              <div className="space-y-2 p-4">
                <p className="font-semibold text-rose-900">{item.title}</p>
                <p className="text-sm text-zinc-600">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-gradient-to-b from-rose-50 via-white to-rose-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-rose-700">Форма записи</p>
            <h3 className="font-display text-3xl text-rose-900 md:text-4xl">Свяжусь в Telegram после заявки</h3>
            <p className="text-zinc-700">
              Оставьте контакты — отправлю в Telegram и уточню удобное время. Можно сразу писать в мессенджер: @medicaderm.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              <div className="flex items-center gap-3 rounded-2xl border border-rose-100 bg-white/80 p-4">
                <Clock3 className="h-5 w-5 text-rose-700" />
                <div>
                  <p className="font-medium text-rose-900">График</p>
                  <p className="text-zinc-600">Пн–Сб • 10:00–21:00</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-rose-100 bg-white/80 p-4">
                <Instagram className="h-5 w-5 text-rose-700" />
                <div>
                  <p className="font-medium text-rose-900">Instagram</p>
                  <p className="text-zinc-600">@medicaderm (прямая ссылка из инсты)</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-rose-100 bg-white/80 p-6 text-sm text-zinc-700 shadow">
              <p className="font-semibold text-rose-900">Адрес и навигация</p>
              <p className="mt-2 text-zinc-600">
                Минск, уточняем при записи. В поиске карт и интернете — MEDICADERM CLINIC. Удобный вход, парковка рядом.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl border border-rose-100 bg-white/90 p-6 shadow-xl shadow-rose-100 backdrop-blur"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm text-rose-900">Имя</label>
                <input
                  name="name"
                  required
                  placeholder="Ваше имя"
                  className="mt-1 w-full rounded-xl border border-rose-100 px-3 py-2 outline-none ring-rose-200 focus:ring-2"
                />
              </div>
              <div>
                <label className="text-sm text-rose-900">Телефон / Telegram</label>
                <input
                  name="phone"
                  required
                  placeholder="+375… или @username"
                  className="mt-1 w-full rounded-xl border border-rose-100 px-3 py-2 outline-none ring-rose-200 focus:ring-2"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-rose-900">Услуга</label>
              <select
                name="service"
                className="mt-1 w-full rounded-xl border border-rose-100 px-3 py-2 outline-none ring-rose-200 focus:ring-2"
                defaultValue="Очищение кожи"
              >
                {services.map((service) => (
                  <option key={service.title}>{service.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-rose-900">Комментарий</label>
              <textarea
                name="comment"
                rows={4}
                placeholder="Опишите задачу, удобное время, чувствительность кожи"
                className="mt-1 w-full rounded-xl border border-rose-100 px-3 py-2 outline-none ring-rose-200 focus:ring-2"
              />
            </div>

            <label className="flex items-start gap-3 text-sm text-zinc-700">
              <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-rose-200 text-rose-700 focus:ring-rose-300" />
              Согласен(а) с обработкой персональных данных и передачей контакта для связи в Telegram.
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-rose-700 px-5 py-3 text-white transition hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-80"
            >
              {status === "sending" ? "Отправляю..." : "Отправить заявку"}
              <Send className="h-4 w-4" />
            </button>

            {status !== "idle" && (
              <p
                className={`text-sm ${
                  status === "success" ? "text-emerald-700" : status === "error" ? "text-red-700" : "text-rose-800"
                }`}
              >
                {statusMessage}
              </p>
            )}
          </form>
        </div>
      </section>

      <footer className="border-t border-rose-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-zinc-600 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-rose-900">
            <Sparkles className="h-4 w-4" />
            MEDICADERM CLINIC • Клиника авторской косметологии
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a href="https://t.me/medicaderm" className="inline-flex items-center gap-2 hover:text-rose-800">
              <Mail className="h-4 w-4" />
              t.me/medicaderm
            </a>
            <a href="https://instagram.com/medicaderm" className="inline-flex items-center gap-2 hover:text-rose-800">
              <Instagram className="h-4 w-4" />
              Instagram
            </a>
            <a href="tel:+375000000000" className="inline-flex items-center gap-2 hover:text-rose-800">
              <Phone className="h-4 w-4" />
              Позвонить
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
