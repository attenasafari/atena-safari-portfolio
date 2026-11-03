"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { withBasePath } from "@/lib/base-path";
import "./landing.css";
import { startLandingMotion } from "./scroll-motion";

function asset(file: string) {
  return withBasePath(`/landing/${file}`);
}

function Glyph({
  file,
  width,
  height,
  alt = "",
  className,
}: {
  file: string;
  width: number;
  height: number;
  alt?: string;
  className?: string;
}) {
  return (
    <img
      className={className ? `ach-glyph ${className}` : "ach-glyph"}
      src={asset(file)}
      alt={alt}
      width={width}
      height={height}
    />
  );
}

const steps = [
  {
    n: "۴",
    title: "درآمد خود را دریافت کنید",
    body: "بلافاصله پس از پرداخت مشتری، مبلغ به حسابتان واریز می‌شود.",
  },
  {
    n: "۳",
    title: "به مشتری برسید و کار کنید",
    body: "به آدرس مشتری بروید، کار را با کیفیت انجام دهید و رضایت او را جلب کنید.",
  },
  {
    n: "۲",
    title: "کار مناسب را انتخاب کنید",
    body: "جزئیات کامل سفارش، آدرس، نوع کار و قیمت پیشنهادی را ببینید و تصمیم بگیرید.",
  },
  {
    n: "۱",
    title: "سفارش‌ها را مرور کنید",
    body: "لیست درخواست‌ها را ببینید و با توجه به تخصصتان انتخاب کنید.",
  },
];

const commission = [
  "کمیسیون فقط پس از تکمیل موفق کار کسر می‌شود.",
  "مبلغ کمیسیون از ابتدا در صفحه سفارش نمایش داده می‌شود.",
  "هیچ هزینه ثابت ماهانه یا اشتراک اجباری وجود ندارد.",
  "با افزایش امتیاز، می‌توانید به سطوح کمیسیون بهتر برسید.",
];

const documents = [
  {
    id: "license",
    label: "جواز کسب",
    photo: false,
    tips: [
      "تصویر جواز باید کامل، خوانا و بدون برش باشد.",
      "تصویر باید کاملاً واضح و بدون انعکاس نور باشد.",
      "هیچ بخشی نباید دست‌نوشته یا خط خوردگی داشته باشد",
    ],
  },
  {
    id: "note",
    label: "سفته",
    photo: false,
    tips: [
      "مبلغ، تاریخ و امضا باید در تصویر خوانا باشد.",
      "تصویر باید کاملاً واضح و بدون انعکاس نور باشد.",
      "هیچ بخشی نباید دست‌نوشته یا خط خوردگی داشته باشد",
    ],
  },
  {
    id: "skill",
    label: "مدرک مهارتی",
    photo: false,
    tips: [
      "نام مدرک و مشخصات دارنده باید در تصویر مشخص باشد.",
      "تصویر باید کاملاً واضح و بدون انعکاس نور باشد.",
      "هیچ بخشی نباید دست‌نوشته یا خط خوردگی داشته باشد",
    ],
  },
  {
    id: "deed",
    label: "سند",
    photo: false,
    tips: [
      "صفحه مشخصات ملک را کامل و بدون برش عکس بگیرید.",
      "تصویر باید کاملاً واضح و بدون انعکاس نور باشد.",
      "هیچ بخشی نباید دست‌نوشته یا خط خوردگی داشته باشد",
    ],
  },
  {
    id: "lease",
    label: "اجاره‌نامه",
    photo: false,
    tips: [
      "صفحه طرفین و نشانی را جدا از صفحه امضا عکس بگیرید.",
      "تصویر باید کاملاً واضح و بدون انعکاس نور باشد.",
      "هیچ بخشی نباید دست‌نوشته یا خط خوردگی داشته باشد",
    ],
  },
  {
    id: "bill",
    label: "قبض آب یا برق",
    photo: false,
    tips: [
      "نام مشترک و نشانی باید در تصویر خوانا باشد.",
      "تصویر باید کاملاً واضح و بدون انعکاس نور باشد.",
      "هیچ بخشی نباید دست‌نوشته یا خط خوردگی داشته باشد",
    ],
  },
  {
    id: "national",
    label: "کارت ملی",
    photo: false,
    tips: [
      "روی کارت را کامل و بدون برش عکس بگیرید.",
      "تصویر باید کاملاً واضح و بدون انعکاس نور باشد.",
      "هیچ بخشی نباید دست‌نوشته یا خط خوردگی داشته باشد",
    ],
  },
  {
    id: "birth",
    label: "تصویر شناسنامه",
    photo: true,
    tips: [
      "صفحه اول (مشخصات) و صفحه توضیحات را جداگانه عکس بگیرید.",
      "تصویر باید کاملاً واضح و بدون انعکاس نور باشد.",
      "هیچ بخشی نباید دست‌نوشته یا خط خوردگی داشته باشد",
    ],
  },
];

const faqs = [
  "چه مهارت‌هایی را در آچاره جذب می‌کنید؟",
  "هزینه‌ی ثبت‌نام چقدر است؟",
  "هزینه‌ی ثبت‌نام فقط برای آنلاین است یا ثبت‌نام حضوری هم هزینه دارد؟",
  "تأیید شدن من چقدر طول می‌کشد؟",
  "بدون مدرک چقدر زمان می‌برد تا تأیید شوم؟",
  "مبلغ سفته چقدر است؟",
  "تهران نیستم و می‌خواهم ثبت‌نام کنم چه کاری باید انجام دهم؟",
  "مبلغ سفته چقدر است؟",
];

const posts = [
  {
    href: "#posts",
    image: "blog-interior.jpg",
    alt: "اتاق نشیمن روشن با مبل آبی و میز چوبی",
    chip: "طراحی داخلی",
    chipClass: "ach-chipTeal",
    title: "۱۰ ایده خلاقانه برای دکوراسیون منزل در ...",
    body: "با این ایده‌های ساده و کم‌هزینه، خانه‌تان را به فضایی دلنشین و مدرن تبدیل کنید. طراحان حرفه‌ای این نکات را پیشنهاد می‌دهند.",
    minutes: "۵ دقیقه",
    views: "۲,۳۴۵ بازدید",
    date: "۱۵ فروردین ۱۴۰۴",
  },
  {
    href: "#posts",
    image: "blog-plumbing.jpg",
    alt: "تعمیرکار در حال باز کردن لوله زیر سینک",
    chip: "تعمیرات",
    chipClass: "ach-chipAmber",
    title: "راهنمای کامل تعمیرات لوله‌کشی در خانه",
    body: "قبل از اینکه با یک مشکل کوچک لوله‌کشی به متخصص مراجعه کنید، این راهنمای جامع را بخوانید تا بدانید چه کاری باید انجام دهید.",
    minutes: "۸ دقیقه",
    views: "۱,۸۹۰ بازدید",
    date: "۸ فروردین ۱۴۰۴",
  },
  {
    href: "#posts",
    image: "blog-electric.jpg",
    alt: "برقکار با دستکش ایمنی در حال بررسی تابلو برق",
    chip: "برق‌کاری",
    chipClass: "ach-chipGreen",
    title: "نکات ایمنی برق در خانه که باید بدانید",
    body: "ایمنی برق در خانه یکی از مهم‌ترین مسائلی است که هر صاحب خانه‌ای باید به آن توجه کند. این نکات ساده می‌تواند جان شما را نجات دهد.",
    minutes: "۶ دقیقه",
    views: "۳,۱۲۰ بازدید",
    date: "۲ فروردین ۱۴۰۴",
  },
];

function persianDigits(value: string) {
  const map = "۰۱۲۳۴۵۶۷۸۹";
  return value.replace(/[۰-۹]/g, (digit) => String(map.indexOf(digit)));
}

function validMobile(value: string) {
  const digits = persianDigits(value).replace(/\D/g, "");
  return /^09\d{9}$/.test(digits) || /^9\d{9}$/.test(digits);
}

export function Landing() {
  const countryId = useId();
  const phoneId = useId();
  const [countryOpen, setCountryOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<{ error: boolean; text: string } | null>(null);
  const [doc, setDoc] = useState("birth");
  const [openPlace, setOpenPlace] = useState({ tehran: true, other: true });
  const [openFaq, setOpenFaq] = useState<boolean[]>(() => faqs.map(() => true));
  const onlineDialog = useRef<HTMLDialogElement>(null);
  const inPersonDialog = useRef<HTMLDialogElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = pageRef.current;
    if (!node) return;
    return startLandingMotion(node);
  }, []);
  const activeDoc = documents.find((item) => item.id === doc) ?? documents[7];

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validMobile(phone)) {
      setStatus({ error: true, text: "شماره تلفن همراه را با ۰۹ و یازده رقم وارد کنید." });
      return;
    }
    setStatus({
      error: false,
      text: "شماره شما ثبت شد. ادامه ثبت‌نام از همین صفحه و با مدارک بخش پایین انجام می‌شود.",
    });
  }

  function onTabKey(event: React.KeyboardEvent<HTMLDivElement>) {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const index = documents.findIndex((item) => item.id === doc);
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? documents.length - 1
          : event.key === "ArrowLeft"
            ? (index + 1) % documents.length
            : (index - 1 + documents.length) % documents.length;
    setDoc(documents[next].id);
    const tabs = event.currentTarget.querySelectorAll<HTMLButtonElement>("[role='tab']");
    tabs[next]?.focus();
  }

  return (
    <div ref={pageRef} className={"ach-page"} lang="fa">
      <a className={"ach-skip"} href="#signup">
        رفتن به ثبت‌نام
      </a>
      <header className={"ach-header"}>
        <div className={"ach-headerInner"}>
          <a className={"ach-phoneLink"} href="tel:1471">
            <Glyph file="call-header.svg" width={20} height={20} alt="" />
            <span>۱۴۷۱</span>
          </a>
          <a className={"ach-logoSlot"} href="#signup" aria-label="آچاره">
            <Glyph file="logo-header.svg" width={53} height={26} alt="" />
          </a>
        </div>
      </header>

      <section className={"ach-hero"} aria-labelledby="signup-title">
        <div className={"ach-heroMedia"}>
          <img
            className={"ach-heroCrop"}
            src={asset("hero-join.png")}
            alt="متخصص آچاره با یونیفرم فیروزه‌ای در حال نظافت منزل"
          />
          <div className={"ach-heroFade"} />
        </div>
        <div className={"ach-formCard"} id="signup">
          <h1 id="signup-title">
            مهارتت رو به <span className={"ach-accent"}>درآمد</span> تبدیل کن
          </h1>
          <p className={"ach-lede"}>
            بیش از ۵۰۰,۰۰۰ مشتری در سراسر ایران منتظر متخصصی مثل شما هستند.
          </p>
          <form className={"ach-form"} onSubmit={onSubmit} noValidate>
            <div className={"ach-field"}>
              <p className={"ach-floatLabel"} id={countryId}>
                کشور خود را انتخاب کنید
              </p>
              <button
                type="button"
                className={"ach-countryBtn"}
                aria-haspopup="listbox"
                aria-expanded={countryOpen}
                aria-labelledby={countryId}
                onClick={() => setCountryOpen((open) => !open)}
              >
                <Glyph file="chevron-down.svg" width={16} height={16} alt="" />
                <span className={"ach-countryValue"}>
                  ایران
                  <Glyph file="flag-ir.svg" width={16} height={16} alt="" />
                </span>
              </button>
              {countryOpen ? (
                <ul className={"ach-menu"} role="listbox" aria-label="کشور">
                  <li role="presentation">
                    <button type="button" role="option" aria-selected="true" onClick={() => setCountryOpen(false)}>
                      ایران
                    </button>
                  </li>
                </ul>
              ) : null}
            </div>
            <div className={"ach-phoneField"}>
              <label className={"ach-srOnly"} htmlFor={phoneId}>
                شماره تلفن همراه
              </label>
              <input
                id={phoneId}
                name="phone"
                inputMode="tel"
                autoComplete="tel"
                placeholder="شماره تلفن همراه"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
              <Glyph file="phone.svg" width={16} height={16} alt="" />
            </div>
            <p className={"ach-agree"}>
              با ورود به آچاره با <a href="#conditions">قوانین و مقررات</a> موافقم.
            </p>
            <button className={"ach-btnWide"} type="submit">
              ثبت‌نام به عنوان متخصص
            </button>
            {status ? (
              <p className={"ach-status"} role="status" data-error={status.error}>
                {status.text}
              </p>
            ) : null}
          </form>
        </div>
      </section>

      <section className="ach-section ach-how" id="how" aria-labelledby="how-title">
        <div className={"ach-wrap"}>
          <h2 className="ach-h2 ach-rise" id="how-title">
            چطور در آچاره کار می‌کنید؟
          </h2>
          <div className={"ach-steps"}>
            {steps.map((step, index) => (
              <div key={step.n} style={{ display: "contents" }}>
                <article className="ach-step ach-rise">
                  <div className={"ach-badge"} aria-hidden="true">
                    <Glyph className={"ach-ring"} file="step-ring.svg" width={64} height={64} />
                    <span className={"ach-num"}>{step.n}</span>
                    <Glyph className={"ach-cap"} file="step-cap.svg" width={65} height={33} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
                {index < steps.length - 1 ? (
                  <Glyph
                    className={"ach-stepArrow"}
                    file={index === steps.length - 2 ? "arrow-step-2.svg" : "arrow-step.svg"}
                    width={17}
                    height={15}
                    alt=""
                  />
                ) : null}
              </div>
            ))}
          </div>
          <div className="ach-commission ach-riseLate">
            <a className={"ach-btn"} href="#conditions">
              <Glyph file="arrow-left.svg" width={16} height={16} alt="" />
              <span>بیشتر بخوانید</span>
            </a>
            <div>
              <h3>نکات مهم درباره کمیسیون:</h3>
              <ul className={"ach-checks"}>
                {commission.map((item) => (
                  <li key={item}>
                    <span className={"ach-tick"} aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={"ach-section"} id="conditions" aria-labelledby="conditions-title">
        <div className={"ach-condHead"}>
          <h2 className={"ach-display"} id="conditions-title">
            شرایط ثبت‌نام
          </h2>
          <p className={"ach-sub"}>
            برای تکمیل ثبت‌نام تمام شرایط را باید داشته باشید و فقط با داشتن تعدادی از شرایط نمی‌توانید ثبت‌نام خود را تکمیل کنید.
          </p>
        </div>
        <div className={"ach-condGrid"}>
          <article className="ach-panel ach-rise">
            <h3>شرایط مهارتی</h3>
            <div className={"ach-rows"}>
              <p className={"ach-row"}>
                <Glyph file="check.svg" width={24} height={24} alt="" />
                داشتن مدرک فنی یا تحصیلی مرتبط
              </p>
              <p className={"ach-row"}>
                <Glyph file="check.svg" width={24} height={24} alt="" />
                قبولی در آزمون مهارتی آچاره
              </p>
              <p className={"ach-row"}>
                <Glyph file="check.svg" width={24} height={24} alt="" />
                قبولی در مصاحبه تخصصی با سرپرست مهارت
              </p>
              <p className={"ach-note"}>
                <Glyph file="info.svg" width={24} height={24} alt="" />
                اگر مدرک نداری ولی در آزمون ورودی و مصاحبه تخصصی قبول شوید به مراکز آموزشی و پس از دریافت مدرک
              </p>
            </div>
            <div className={"ach-mintBar"}>
              <a className={"ach-btn"} href="#documents">
                <Glyph file="arrow-left.svg" width={16} height={16} alt="" />
                <span>مشاهده</span>
              </a>
              <p>برای مشاهده‌ی اینکه هر یک از مهارت‌ها به کدام یک از موارد بالا نیاز دارد به جدول &quot;راهنمای ثبت‌نام مهارت‌ها&quot; مراجعه کنید.</p>
            </div>
          </article>
          <article className="ach-panel ach-rise">
            <h3>شرایط هویتی و قانونی</h3>
            <div className={"ach-rows"}>
              <p className={"ach-row"}>
                <Glyph file="check.svg" width={24} height={24} alt="" />
                تأیید مدارک هویتی شما (اصل کارت ملی اصل شناسنامه)
              </p>
              <p className={"ach-row"}>
                <Glyph file="check.svg" width={24} height={24} alt="" />
                تأیید محل سکونت
              </p>
              <p className={"ach-note"}>
                <Glyph file="info-2.svg" width={24} height={24} alt="" />
                اگر در خوابگاه زندگی می‌کنید نامه از مسئول خوابگاه به عنوان مدرک محل سکونت قبول می‌شود.
              </p>
              <p className={"ach-note"}>
                <Glyph file="info-2.svg" width={24} height={24} alt="" />
                سند یا اجاره‌نامه می‌تواند به نام پدر،مادر، همسر و فرزندتان باشد. اگر به نام فرد دیگری بود آن فرد باید حضوری با کارت ملی تشریف آورند و پشت سفته شما رو امضاء کنند.
              </p>
              <p className={"ach-row"}>
                <Glyph file="check.svg" width={24} height={24} alt="" />
                داشتن “حسن شهرت انتظامی” (استعلام توسط آچاره انجام می‌شود)
              </p>
            </div>
            <div className={"ach-mintBar"}>
              <a className={"ach-btn"} href="#documents">
                <Glyph file="arrow-left.svg" width={16} height={16} alt="" />
                <span>مشاهده</span>
              </a>
              <p>منشور اخلاقی آچاره</p>
            </div>
          </article>
          <article className="ach-panel ach-riseLate">
            <h3>تعهدات همکاری</h3>
            <div className={"ach-rows"}>
              <p className={"ach-row"}>
                <Glyph file="check.svg" width={24} height={24} alt="" />
                پرداخت هزینه ثبت‌نام
              </p>
              <p className={"ach-row"}>
                <Glyph file="check.svg" width={24} height={24} alt="" />
                ارائه سفته یا چک
              </p>
              <p className={"ach-row"}>
                <Glyph file="check.svg" width={24} height={24} alt="" />
                امضای قرارداد
              </p>
            </div>
            <div className={"ach-mintBar"}>
              <a className={"ach-btn"} href="#documents">
                <Glyph file="arrow-left.svg" width={16} height={16} alt="" />
                <span>مشاهده</span>
              </a>
              <p>برای مشاهده‌ی مبلغ سفته یا چک ضمانت موردنیاز هر یک از مهارت‌ها به جدول &quot;راهنمای تضامین مهارت‌ها&quot; مراجعه کنید.</p>
            </div>
          </article>
          <article className="ach-panel ach-riseLate">
            <h3>داشتن سواد دیجیتال</h3>
            <div className={"ach-rows"}>
              <p className={"ach-row"}>
                <Glyph file="check.svg" width={24} height={24} alt="" />
                داشتن گوشی همراه هوشمند
              </p>
              <p className={"ach-row"}>
                <Glyph file="check.svg" width={24} height={24} alt="" />
                قبولی در آزمون کار با اپلیکیشن
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className={"ach-section"} id="documents" aria-labelledby="documents-title">
        <div className={"ach-narrow"}>
          <h2 className={"ach-display"} id="documents-title">
            مدارک مورد نیاز
          </h2>
          <p className={"ach-sub"}>
            صحت و اعتبار تمامی مدارک ارائه شده، به صورت دقیق توسط کارشناسان واحد ثبت‌نام بررسی می‌گردد.
          </p>
          <div className={"ach-tabs"} role="tablist" aria-label="نوع مدرک" onKeyDown={onTabKey}>
            {documents.map((item) => (
              <button
                key={item.id}
                className={"ach-tab"}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={doc === item.id}
                aria-controls="document-panel"
                tabIndex={doc === item.id ? 0 : -1}
                onClick={() => setDoc(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div
            className={"ach-doc"}
            role="tabpanel"
            id="document-panel"
            aria-labelledby={`tab-${activeDoc.id}`}
          >
            {activeDoc.photo ? (
              <img className={"ach-docPhoto"} src={asset("id-sample.jpg")} alt="نمونه صفحه شناسنامه" />
            ) : null}
            <ol className={"ach-docList"}>
              {activeDoc.tips.map((tip, index) => (
                <li key={tip}>
                  <span className={"ach-badgeNum"}>{["۱", "۲", "۳"][index]}</span>
                  {tip}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className={"ach-section"} id="locations" aria-labelledby="locations-title">
        <div className={"ach-narrow"}>
          <h2 className={"ach-display"} id="locations-title">
            ساعات و محل برای ثبت‌نام حضوری
          </h2>
          <div className={"ach-acc"} id="tehran" style={{ marginTop: 32 }}>
            <h3>
              <button
                className={"ach-accBtn"}
                type="button"
                aria-expanded={openPlace.tehran}
                aria-controls="tehran-panel"
                onClick={() => setOpenPlace((place) => ({ ...place, tehran: !place.tehran }))}
              >
                <Glyph className={"ach-chevron"} file="chevron-up.svg" width={24} height={24} alt="" />
                تهران
              </button>
            </h3>
            {openPlace.tehran ? (
              <div className={"ach-accBody"} id="tehran-panel">
                <ul>
                  <li>آدرس: میدان انقلاب، خیابان کارگر شمالی، بن بست امین، پلاک ۵</li>
                </ul>
                <p className={"ach-transit"}>راه‌های دسترسی حمل‌ونقل عمومی:</p>
                <p className={"ach-transit"}>🚇 مترو: انقلاب</p>
                <p className={"ach-transit"}>🚌 بی‌آرتی: خط ۱ ایستگاه انقلاب</p>
                <ul>
                  <li>پذیرش جهت ثبت‌نام: روزهای شنبه تا چهارشنبه از ساعت ۹ تا ۱۶</li>
                </ul>
              </div>
            ) : null}
          </div>
          <div className={"ach-acc"}>
            <h3>
              <button
                className={"ach-accBtn"}
                type="button"
                aria-expanded={openPlace.other}
                aria-controls="other-panel"
                onClick={() => setOpenPlace((place) => ({ ...place, other: !place.other }))}
              >
                <Glyph className={"ach-chevron"} file="chevron-up.svg" width={24} height={24} alt="" />
                نمایندگی‌های سایر استان‌ها
              </button>
            </h3>
            {openPlace.other ? (
              <div id="other-panel">
                <p className={"ach-callout"}>نکته: قبل از مراجعه، با نمایندگی شهر خود هماهنگ کنید</p>
                <div className={"ach-accBody"}>
                  <ul>
                    <li>
                      <a className={"ach-linkish"} href="#tehran">
                        مشاهده‌ی آدرس نمایندگی‌ها
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="ach-section ach-why" id="why" aria-labelledby="why-title">
        <div className={"ach-narrow"}>
          <h2 className={"ach-h2"} id="why-title">
            چرا آچاره؟
          </h2>
          <div className={"ach-stats"}>
            <article className="ach-stat ach-rise">
              <strong>۴.۸</strong>
              <b>امتیاز متوسط متخصصان</b>
              <p>مشتریان ما از کیفیت کار متخصصان رضایت دارند.</p>
            </article>
            <article className="ach-stat ach-rise">
              <strong>+۱۰۰</strong>
              <b>تخصص مختلف</b>
              <p>از لوله‌کشی تا طراحی داخلی؛ هر مهارتی اینجا جا دارد.</p>
            </article>
            <article className="ach-stat ach-riseLate">
              <strong>+۲۰,۰۰۰</strong>
              <b>متخصص فعال</b>
              <p>جمعی از بهترین متخصصان کشور در آچاره مشغول‌اند.</p>
            </article>
            <article className="ach-stat ach-riseLate">
              <strong>+۱,۰۰۰,۰۰۰</strong>
              <b>مشتری فعال</b>
              <p>نیمی میلیون خانوار منتظر متخصصی مثل شما هستند.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="ach-section ach-videos" id="videos" aria-labelledby="videos-title">
        <h2 className={"ach-h2"} id="videos-title">
          آموزش تصویری ثبت‌نام
        </h2>
        <div className={"ach-videoRow"}>
          <figure className={"ach-video"}>
            <button className={"ach-play"} type="button" onClick={() => inPersonDialog.current?.showModal()}>
              <i aria-hidden="true">▶</i>
              <span className={"ach-srOnly"}>پخش آموزش ثبت‌نام حضوری</span>
            </button>
            <figcaption>ثبت‌نام حضوری</figcaption>
          </figure>
          <figure className={"ach-video"}>
            <button className={"ach-play"} type="button" onClick={() => onlineDialog.current?.showModal()}>
              <i aria-hidden="true">▶</i>
              <span className={"ach-srOnly"}>پخش آموزش ثبت‌نام آنلاین</span>
            </button>
            <figcaption>ثبت‌نام آنلاین</figcaption>
          </figure>
        </div>
        <dialog className={"ach-dialog"} ref={inPersonDialog}>
          <h3>ثبت‌نام حضوری</h3>
          <p>آموزش تصویری مراجعه به دفتر ثبت‌نام، از شنبه تا چهارشنبه، ساعت ۹ تا ۱۶.</p>
          <button className={"ach-btnWide"} type="button" onClick={() => inPersonDialog.current?.close()}>
            بستن
          </button>
        </dialog>
        <dialog className={"ach-dialog"} ref={onlineDialog}>
          <h3>ثبت‌نام آنلاین</h3>
          <p>آموزش تصویری ثبت‌نام با شماره تلفن همراه، از همین صفحه.</p>
          <button className={"ach-btnWide"} type="button" onClick={() => onlineDialog.current?.close()}>
            بستن
          </button>
        </dialog>
      </section>

      <section className="ach-section ach-stories" aria-labelledby="stories-title">
        <div className={"ach-prose"}>
          <h2 className={"ach-h2"} id="stories-title">
            متخصصان دیگر درباره آچاره چه گفته‌اند؟
          </h2>
          <p className={"ach-quiet"}>تجربه واقعی متخصصانی که مسیرشان را با آچاره ساخته‌اند</p>
          <div className={"ach-quotes"}>
            <figure className="ach-quote ach-rise">
              <p>«از وقتی به آچاره پیوستم، درآمدم سه برابر شد. دیگه نگران پیدا کردن مشتری نیستم.»</p>
              <figcaption className={"ach-who"}>
                <span className={"ach-avatar"} role="img" aria-label="محمد رضایی" />
                <span>
                  <strong>محمد رضایی</strong>
                  <span>لوله‌کش — تهران</span>
                </span>
              </figcaption>
            </figure>
            <figure className="ach-quote ach-rise">
              <p>«آچاره بهم یاد داد چطور حرفه‌ای‌تر کار کنم. اپلیکیشن خیلی راحته و پرداخت همیشه سر وقته.»</p>
              <figcaption className={"ach-who"}>
                <span className={"ach-avatar"} role="img" aria-label="علی اکبری" />
                <span>
                  <strong>علی اکبری</strong>
                  <span>برقکار — اصفهان</span>
                </span>
              </figcaption>
            </figure>
            <figure className="ach-quote ach-riseLate">
              <p>«بهترین تصمیمم این بود که به آچاره اومدم. ساعت کاریم رو خودم انتخاب می‌کنم.»</p>
              <figcaption className={"ach-who"}>
                <span className={"ach-avatar"} role="img" aria-label="حسن محمدی" />
                <span>
                  <strong>حسن محمدی</strong>
                  <span>نقاش ساختمان — مشهد</span>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="ach-section ach-posts" id="posts" aria-labelledby="posts-title">
        <h2 className={"ach-h2"} id="posts-title">
          آخرین مطالب
        </h2>
        <p className={"ach-quiet"}>جدیدترین مقالات و راهنماهای تخصصی برای متخصصان و مشتریان</p>
        <div className={"ach-cards"}>
          {posts.map((post) => (
            <a key={post.title} className="ach-card ach-rise" href={post.href}>
              <img src={asset(post.image)} alt={post.alt} />
              <div className={"ach-cardBody"}>
                <p className={`ach-chip ${post.chipClass}`}>{post.chip}</p>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <div className={"ach-meta"}>
                  <div className={"ach-metaGroup"}>
                    <span>
                      <Glyph file="clock.svg" width={14} height={14} alt="" />
                      {post.minutes}
                    </span>
                    <span>
                      <Glyph file="eye.svg" width={14} height={14} alt="" />
                      {post.views}
                    </span>
                  </div>
                  <time>{post.date}</time>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className={"ach-centerBtn"}>
          <a className={"ach-btn"} href="#posts">
            <Glyph file="arrow-left-blog.svg" width={16} height={16} alt="" />
            <span>مشاهده همه مطالب</span>
          </a>
        </div>
      </section>

      <section className={"ach-section"} id="faq" aria-labelledby="faq-title">
        <div className={"ach-prose"}>
          <h2 className={"ach-display"} id="faq-title">
            سوالات متداول
          </h2>
          <div className={"ach-faqList"}>
            {faqs.map((question, index) => {
              const open = openFaq[index];
              const panelId = `faq-panel-${index}`;
              return (
                <article className={"ach-faq"} key={`${question}-${index}`}>
                  <h3>
                    <button
                      className={"ach-faqBtn"}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() =>
                        setOpenFaq((items) => items.map((item, itemIndex) => (itemIndex === index ? !item : item)))
                      }
                    >
                      <Glyph file={open ? "faq-minus.svg" : "faq-plus.svg"} width={24} height={24} alt="" />
                      <span>{question}</span>
                    </button>
                  </h3>
                  {open ? (
                    <p id={panelId}>--</p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <footer className={"ach-footer"} id="footer">
        <div className={"ach-footerTop"}>
          <div className={"ach-brand"}>
            <Glyph file="logo-footer.svg" width={73} height={36} alt="آچاره" />
            <p>آدرس دفتر مرکزی: میدان انقلاب، خیابان کارگر شمالی، بن بست امین، پلاک 5</p>
            <div className={"ach-contacts"}>
              <div className={"ach-contactRow"}>
                <a href="tel:1471">
                  <span>تلفن سراسری ۱۴۷۱</span>
                  <Glyph file="call.svg" width={20} height={20} alt="" />
                </a>
                <a href="tel:54536600">
                  <span>۵۴۵۳۶۶۰۰</span>
                  <Glyph file="call.svg" width={20} height={20} alt="" />
                </a>
              </div>
              <a className={"ach-mail"} href="mailto:info@achareh.ir">
                <span>info[at]achareh.ir</span>
                <Glyph file="message.svg" width={21} height={20} alt="" />
              </a>
            </div>
            <div className={"ach-badges"}>
              <a href="https://ecunion.ir" rel="noopener noreferrer">
                <img src={asset("badge-1.png")} alt="عضو اتحادیه کشوری کسب‌وکارهای مجازی" width={66} height={68} />
              </a>
              <a href="https://samandehi.ir" rel="noopener noreferrer">
                <img src={asset("badge-2.png")} alt="نماد ساماندهی" width={66} height={68} />
              </a>
              <a href="https://enamad.ir" rel="noopener noreferrer">
                <img src={asset("badge-3.png")} alt="نماد اعتماد الکترونیکی" width={66} height={68} />
              </a>
            </div>
          </div>
          <div className={"ach-cols"}>
            <div>
              <h2>لینک‌های مرتبط</h2>
              <ul>
                <li>
                  <a href="#signup">ثبت نام متخصصان</a>
                </li>
                <li>
                  <a href="#signup">دانلود اپلیکیشن متخصصان</a>
                </li>
                <li>
                  <a href="#signup">نسخه وب اپلیکیشن متخصصان</a>
                </li>
              </ul>
            </div>
            <div>
              <h2>آچاره</h2>
              <ul>
                <li>
                  <a href="#why">درباره ما</a>
                </li>
                <li>
                  <a href="#locations">نمایندگی های آچاره در ایران</a>
                </li>
                <li>
                  <a href="#conditions">شرایط استفاده</a>
                </li>
                <li>
                  <a href="#faq">سوالات متداول</a>
                </li>
                <li>
                  <a href="mailto:info@achareh.ir">پیشنهادات و انتقادات</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className={"ach-rule"} />
        <div className={"ach-footerBottom"}>
          <p className={"ach-legal"}>
            حقوق مادی و معنوی این سرویس (وب سایت و اپلیکیشن های موبایل) متعلق به ساناگستر سبز (آچاره) است.
          </p>
          <div className={"ach-socials"}>
            <a className={"ach-social"} href="#footer" aria-label="شبکه اجتماعی">
              <Glyph file="social-1.svg" width={19} height={21} alt="" />
            </a>
            <a className={"ach-social"} href="#footer" aria-label="شبکه اجتماعی">
              <Glyph file="social-2.svg" width={24} height={24} alt="" />
            </a>
            <a className={"ach-social"} href="#footer" aria-label="اینستاگرام">
              <Glyph file="instagram.svg" width={19} height={22} alt="" />
            </a>
            <a className={"ach-social"} href="#footer" aria-label="تلگرام">
              <Glyph file="telegram.svg" width={19} height={22} alt="" />
            </a>
            <a className={"ach-social"} href="#footer" aria-label="آپارات">
              <Glyph file="aparat.svg" width={20} height={20} alt="" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
