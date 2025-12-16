import { useRef, useState } from "react";
import {
  Phone,
  Calendar,
  MapPin,
  Sparkles,
  Mail,
  ArrowRight,
  ArrowLeft,
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
    image: "/skin-cleaning.jpg",
  },
  {
    title: "Обновление кожи",
    description: "Azelac peel, ZK face peel, Peach peel, salicylic/orange peel — мягко выравниваем тон и текстуру.",
    price: "от 180 BYN",
    image: "/skin-refresh.jpg",
  },
  {
    title: "Лечение кожи",
    description: "Комплексные протоколы для акне, постакне, гиперпигментации, купероза, anti-age.",
    price: "индивидуально",
    image: "/skin-health.jpg",
  },
  {
    title: "Уходовые процедуры",
    description: "Авторские spa-программы, восстанавливающие маски, массаж лица и шеи, гидратация.",
    price: "от 130 BYN",
    image: "/uhod.jpg",
  },
  {
    title: "Аппаратные процедуры",
    description: "Geneo+ и другие технологии для омоложения, лифтинга и улучшения качества кожи.",
    price: "110 BYN",
    image: "/apparat-device.jpg",
  },
  {
    title: "Лечение волос",
    description: "Подбор ухода для кожи головы, укрепление луковиц, курсы для профилактики выпадения.",
    price: "от 150 BYN",
    image: "/hair-health.jpg",
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
  { title: "Работа 1", after: "/beforeafter/ba_1.JPG", note: "Результат процедуры" },
  { title: "Работа 2", after: "/beforeafter/ba_2.JPG", note: "Результат процедуры" },
  { title: "Работа 3", after: "/beforeafter/ba_3.JPG", note: "Результат процедуры" },
  { title: "Работа 4", after: "/beforeafter/ba_4.JPG", note: "Результат процедуры" },
  { title: "Работа 6", after: "/beforeafter/ba_6.JPG", note: "Результат процедуры" },
  { title: "Работа 7", after: "/beforeafter/ba_7.JPG", note: "Результат процедуры" },
  { title: "Работа 9", after: "/beforeafter/ba_9.PNG", note: "Результат процедуры" },
  { title: "Работа 11", after: "/beforeafter/ba_11.JPG", note: "Результат процедуры" },
  { title: "Работа 12", after: "/beforeafter/ba_12.JPEG", note: "Результат процедуры" },
  { title: "Работа 13", after: "/beforeafter/ba_13.JPG", note: "Результат процедуры" },
  { title: "Работа 14", after: "/beforeafter/ba_14.JPG", note: "Результат процедуры" },
  { title: "Работа 16", after: "/beforeafter/ba_16.JPG", note: "Результат процедуры" },
  { title: "Работа 17", after: "/beforeafter/ba_17.JPG", note: "Результат процедуры" },
  { title: "Работа 18", after: "/beforeafter/ba_18.JPG", note: "Результат процедуры" },
  { title: "Работа 19", after: "/beforeafter/ba_19.JPG", note: "Результат процедуры" },
  { title: "Работа 20", after: "/beforeafter/ba_20.PNG", note: "Результат процедуры" },
  { title: "Работа 21", after: "/beforeafter/ba_21.PNG", note: "Результат процедуры" },
  { title: "Работа 22", after: "/beforeafter/ba_22.PNG", note: "Результат процедуры" },
  { title: "Работа 23", after: "/beforeafter/ba_23.JPG", note: "Результат процедуры" },
  { title: "Работа 24", after: "/beforeafter/ba_24.PNG", note: "Результат процедуры" },
  { title: "Работа 25", after: "/beforeafter/ba_25.JPEG", note: "Результат процедуры" },
];

export default function CosmetologistLanding() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim() ?? "";
    const phone = formData.get("phone")?.toString().trim() ?? "";
    const service = formData.get("service")?.toString() ?? "";
    const comment = formData.get("comment")?.toString() ?? "";

    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch("/api/send_telegram_form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, service, comment }),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      setStatusMessage("Заявка отправлена. Я свяжусь с вами в ближайшее время.");
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setStatusMessage("Не удалось отправить. Попробуйте ещё раз позже.");
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
            ЭСТЕТИЧЕСКАЯ КОСМЕТОЛОГИЯ. КА
          </a>
          <nav className="hidden items-center gap-6 text-sm text-zinc-700 md:flex">
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

      <section
        id="hero"
        className="relative bg-white"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255), rgba(255,255,255,0.97)), url('/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_520px_at_10%_-10%,rgba(244,114,182,0.08),transparent)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-20">
          <div className="space-y-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 shadow-sm">
              <CheckCircle2 className="h-4 w-4" />
              Сертифицированный косметолог • 8+ лет практики
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-zinc-900 md:text-5xl">
                Авторская косметология от&nbsp;Анны&nbsp;Кулеш
              </h1>
              <p className="max-w-3xl text-lg text-zinc-700">
                Косметолог с мед. образованием в Минске. Бережно помогаю коже выглядеть здоровой и ухоженной: уходовые процедуры,
                авторские программы лечения, ботулинотерапия, биоревитализация.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-4">
                <p className="font-medium text-rose-900">Авторские программы</p>
                <p className="text-zinc-600">Комбинирую уход, пилинги, аппаратные методики под задачу кожи.</p>
              </div>
              <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-4">
                <p className="font-medium text-rose-900">Домашний уход</p>
                <p className="text-zinc-600">Подбираю схемы для закрепления результата между визитами.</p>
              </div>
            </div>
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

          <div className="relative">
            <div className="relative overflow-hidden rounded-[32px] border border-white/40 bg-white/60 shadow-xl backdrop-blur-sm">
              <img
                src="/anna_specialist.JPG"
                alt="Косметолог в халате"
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute left-4 right-4 top-4 flex items-center gap-2 rounded-2xl border border-white/50 bg-white/60 px-3 py-2 text-sm text-rose-900 shadow-lg backdrop-blur-md">
                <ShieldCheck className="h-4 w-4" />
                Медицинское образование и авторские протоколы
              </div>
              <div className="absolute bottom-4 left-4 right-4 grid gap-3 text-sm text-rose-900">
                <div className="flex items-center justify-between rounded-2xl border border-white/40 bg-white/55 px-4 py-3 shadow-lg backdrop-blur-md">
                  <span className="font-medium">8 лет практики</span>
                  <span className="text-rose-700">3800+ процедур</span>
                </div>
                <div className="rounded-2xl border border-white/40 bg-white/55 px-4 py-3 shadow-lg backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.1em] text-rose-600">Образование</p>
                  <p className="mt-1 text-sm text-zinc-700">
                    Медицинский колледж, серебряный призёр WorldSkills, курсы Dermaceutic, HL, Geneo+.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-gradient-to-b from-white via-rose-50/40 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
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
                  className="relative h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-rose-100/50 via-zinc-900/20 to-zinc-900/60"
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

      <section id="results" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="font-display text-3xl text-rose-900 md:text-4xl">Результаты пациентов</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <ShieldCheck className="h-5 w-5 text-rose-700" />
            Фото без фильтров, с согласия клиентов.
          </div>
        </div>

        <div className="mt-4 hidden items-center justify-between gap-2 md:flex">
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Влево"
              onClick={() => resultsRef.current?.scrollBy({ left: -320, behavior: "smooth" })}
              className="rounded-full border border-rose-100 bg-white px-3 py-2 text-rose-800 shadow-sm hover:bg-rose-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Вправо"
              onClick={() => resultsRef.current?.scrollBy({ left: 320, behavior: "smooth" })}
              className="rounded-full border border-rose-100 bg-white px-3 py-2 text-rose-800 shadow-sm hover:bg-rose-50"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={resultsRef}
          className="mt-3 flex snap-x snap-mandatory gap-4 overflow-x-auto rounded-[16px] border border-rose-100 bg-white/85 px-5 py-4 shadow-[0_10px_24px_-20px_rgba(0,0,0,0.35)] md:gap-5 lg:gap-6"
          style={{ scrollPaddingLeft: "20px", scrollPaddingRight: "12px" }}
        >
          {beforeAfter.map((item, idx) => (
            <div
              key={item.after}
              className="snap-start overflow-hidden rounded-[18px] border border-rose-100 bg-white shadow-sm flex-shrink-0 w-[240px] md:w-[260px] lg:w-[280px]"
            >
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-gradient-to-br from-rose-50 via-white to-rose-100"
                style={{
                  backgroundImage: item.after
                    ? `linear-gradient(120deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05)), url('${item.after}')`
                    : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!item.after && (
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-rose-300">
                    Фото скоро
                  </div>
                )}
                <span className="absolute left-2 top-2 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-rose-900 shadow">
                  Фото {idx + 1}
                </span>
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 w-2" aria-hidden />
        </div>
      </section>

      <section id="contact" className="bg-gradient-to-b from-rose-50 via-white to-rose-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div className="space-y-4">
            <h3 className="font-display text-3xl text-rose-900 md:text-4xl">Свяжусь в Telegram после заявки</h3>
            <p className="text-zinc-700">
              Оставьте контакты и я свяжусь с Вами для дальнейшего уточнения деталей и записи. Можно сразу писать в инстаграмме: @ani.facetune__aesthetics.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              <div className="flex items-center gap-3 rounded-2xl border border-rose-100 bg-white/80 p-4">
                <Clock3 className="h-5 w-5 text-rose-700" />
                <div>
                  <p className="font-medium text-rose-900">График</p>
                  <p className="text-zinc-600">Пн–Сб •у 10:00–21:00</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-rose-100 bg-white/80 p-4">
                <Instagram className="h-5 w-5 text-rose-700" />
                <div>
                  <p className="font-medium text-rose-900">Instagram</p>
                  <p className="text-zinc-600">@ani.facetune__aesthetics</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-rose-100 bg-white/80 p-6 text-sm text-zinc-700 shadow">
              <p className="font-semibold text-rose-900">Адрес и навигация</p>
              <p className="mt-2 text-zinc-600">
                г. Минск, ул. Минская 82.
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
            ЭСТЕТИЧЕСКАЯ КОСМЕТОЛОГИЯ. КА
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a href="https://t.me/ani_kulesh" className="inline-flex items-center gap-2 hover:text-rose-800">
              <Mail className="h-4 w-4" />
              t.me/ani_kulesh
            </a>
            <a href="https://instagram.com/ani.facetune__aesthetics" className="inline-flex items-center gap-2 hover:text-rose-800">
              <Instagram className="h-4 w-4" />
              Instagram
            </a>
            <a href="tel:+375333053850" className="inline-flex items-center gap-2 hover:text-rose-800">
              <Phone className="h-4 w-4" />
              Позвонить
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
