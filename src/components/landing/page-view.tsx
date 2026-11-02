import { Asset } from "./asset";
import { ContactForm, contactFormScript } from "./contact-form";
import { DocumentLocale } from "./locale";
import { Organizations } from "./organizations";

const floors = [
  {
    name: "پشت‌بام",
    task: "سرویس کولرها",
    chip: "فصلی",
    tone: "muted",
    side: "left",
    fill: "#1a4a40",
    windows: ["glass", "glass", "glass", "glass"],
  },
  {
    name: "طبقه ۴",
    task: "آسانسور · بازدید ماهانه",
    chip: "انجام شد",
    tone: "done",
    side: "right",
    fill: "#123a32",
    windows: ["glass", "glass", "mint", "glass"],
  },
  {
    name: "طبقه ۳",
    task: "تعمیر کولر اتاق جلسه",
    chip: "در مسیر",
    tone: "progress",
    side: "left",
    fill: "#1a4a40",
    windows: ["glass", "amber", "glass", "glass"],
  },
  {
    name: "طبقه ۲",
    task: "نظافت روزانه دفتر",
    chip: "انجام شد",
    tone: "done",
    side: "right",
    fill: "#123a32",
    windows: ["glass", "glass", "mint", "glass"],
  },
  {
    name: "طبقه ۱",
    task: "جابه‌جایی میزهای فروش",
    chip: "پنج‌شنبه",
    tone: "muted",
    side: "left",
    fill: "#1a4a40",
    windows: ["glass", "glass", "glass", "glass"],
  },
  {
    name: "همکف",
    task: "پذیرایی رویداد لابی",
    chip: "امروز",
    tone: "progress",
    side: "right",
    fill: "#123a32",
    windows: ["glass", "amber", "glass", "glass"],
  },
  {
    name: "زیرزمین",
    task: "سرویس موتورخانه",
    chip: "انجام شد",
    tone: "done",
    side: "left",
    fill: "#0b2a24",
    windows: ["glass", "glass", "mint", "glass"],
  },
] as const;

const compareRows = [
  ["همه خدمات و متخصص‌های آچاره", true],
  ["فاکتور رسمی", false],
  ["اکانت منیجر اختصاصی", false],
  ["ثبت درخواست تلفنی، بدون اپ", false],
  ["درخواست‌های فوری", false],
  ["نیروهای ثابت و غربال‌شده", false],
  ["تسویه ماهانه", false],
  ["قرارداد رسمی", false],
  ["هماهنگی مجوز ورود", false],
  ["چند خدمت در یک قرارداد", false],
] as const;

const addons = [
  {
    icon: "/landing/icons/hammer.svg",
    title: "فنی‌مهندسی و بازسازی",
    body: "طراحی و مشاوره، نوسازی، دکوراسیون، اعلان و اطفای حریق.",
  },
  {
    icon: "/landing/icons/building.svg",
    title: "مدیریت نگهداری تجهیزات",
    body: "برنامه منظم آسانسور و موتورخانه، شناسنامه هوشمند تجهیزات، پنل سازمانی و گزارش.",
  },
  {
    icon: "/landing/icons/user.svg",
    title: "نیروی مستقر در محل",
    body: "نظافت، پذیرایی یا تکنسین ثابت در سازمان شما.",
  },
  {
    icon: "/landing/icons/gift.svg",
    title: "رفاه کارکنان",
    body: "خدمات سلامت در محل کار، کارت هدیه و تخفیف.",
  },
] as const;

const services = [
  "نظافت و پذیرایی",
  "تعمیرات برق و لوله‌کشی",
  "سرمایش و گرمایش",
  "خدمات فوری",
  "جابه‌جایی دفتر",
  "آسانسور و موتورخانه",
  "اعلان و اطفای حریق",
  "نیروی مستقر در محل",
  "طراحی و بازسازی",
  "دکوراسیون داخلی",
  "سلامت کارکنان",
  "کارت هدیه",
] as const;

const faqs = [
  {
    q: "آیا پیش از شروع سفارش در آچاره سازمانی، هزینه نهایی مشخص می‌شود؟",
    a: "بله؛ پس از بررسی اولیه درخواست شما، برآورد مالی تهیه شده و اجرا فقط بعد از تأیید رسمی سازمان آغاز خواهد شد.",
  },
  {
    q: "خدمات سازمانی آچاره در چه شهرهایی ارائه می‌شود؟",
    a: "پوشش اصلی و گسترده در تهران است و ارائه خدمات در سایر کلان‌شهرها متناسب با ظرفیت موجود، به‌صورت محدود و موردی بررسی می‌شود.",
  },
  {
    q: "سفارش‌های یک سازمان در آچاره سازمانی چطور پشتیبانی می‌شود؟",
    a: "پس از ثبت درخواست اولیه شما و انتخاب طرح موردنظر، یک اکانت منیجر اختصاصی وظیفه پیگیری درخواست و مشاوره به سازمان شما برای ارائه این خدمات را عهده‌دار می‌شود.",
  },
  {
    q: "آیا برای استفاده از تمامی خدمات آچاره سازمانی، عقد قرارداد الزامی‌ است؟",
    a: "خیر. در بسته برنزی الزام قرارداد وجود ندارد؛ اما بسته‌های نقره‌ای و طلایی با قرارداد سازمانی ارائه می‌شوند.",
  },
] as const;

const footerColumns = [
  {
    title: "آچاره",
    links: [
      "درباره ما",
      "ثبت نام متخصصان",
      "نمایندگی های آچاره در ایران",
      "شرایط استفاده",
      "سوالات متداول",
      "پیشنهادات و انتقادات",
    ],
  },
  {
    title: "لینک‌های مرتبط",
    links: [
      "نظافت و پذیرایی",
      "باربری و جابجایی",
      "طراحی و بازسازی ساختمان",
      "نصب و تعمیر لوازم خانگی",
      "خدمات و تعمیرات خودرو",
    ],
  },
  {
    title: "مجلات آچاره",
    links: [
      "مجله عمومی آچاره",
      "وبلاگ آچاره",
      "مجله تخصصی بازسازی و دکوراسیون",
      "مجله تخصصی زیبایی و آرایش",
      "آچاره سلامت",
    ],
  },
  {
    title: "آچاره در شهر شما",
    links: ["کرج", "اصفهان", "شیراز", "مشهد"],
  },
] as const;

const socials = [
  { src: "/landing/icons/whatsapp.svg", w: 19, h: 22, label: "واتساپ" },
  { src: "/landing/icons/namasha.svg", w: 22, h: 22, label: "نماشا" },
  { src: "/landing/icons/youtube.svg", w: 22, h: 19, label: "یوتیوب" },
  { src: "/landing/icons/facebook.svg", w: 13, h: 20, label: "فیسبوک" },
  { src: "/landing/icons/x-social.svg", w: 22, h: 23, label: "ایکس" },
  { src: "/landing/icons/instagram.svg", w: 19, h: 22, label: "اینستاگرام" },
  { src: "/landing/icons/telegram.svg", w: 19, h: 22, label: "تلگرام" },
  { src: "/landing/icons/aparat.svg", w: 20, h: 20, label: "آپارات" },
  { src: "/landing/icons/linkedin.svg", w: 19, h: 22, label: "لینکدین" },
] as const;

function FloorLabel({
  floor,
}: {
  floor: (typeof floors)[number];
}) {
  return (
    <div className={`floor-label tone-${floor.tone}`}>
      <span className="status-chip">{floor.chip}</span>
      <span className="floor-copy">
        <span className="floor-name">{floor.name}</span>
        <span className="floor-task">{floor.task}</span>
      </span>
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="landing" lang="fa" dir="rtl">
      <DocumentLocale />
      <script dangerouslySetInnerHTML={{ __html: contactFormScript }} />
      <a className="skip" href="#content">
        رفتن به محتوا
      </a>
      <header className="site-header">
        <a className="brand" href="#content" aria-label="آچاره">
          <Asset src="/landing/logos/mark.svg" alt="" width={53} height={26} />
        </a>
        <nav className="site-nav" aria-label="ناوبری اصلی">
          <a href="#customers">مشتریان ما</a>
          <a href="#benefits">مزایا</a>
          <a href="#orgs">انواع سازمان‌ها</a>
        </nav>
        <div className="header-actions">
          <a className="phone-chip" href="tel:1471">
            <Asset src="/landing/icons/phone.svg" alt="" width={16} height={16} />
            ۱۴۷۱
          </a>
          <a className="btn" href="#contact">
            درخواست خدمات
          </a>
        </div>
      </header>

      <main id="content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-kicker">بازوی پشتیبانی فنی سازمان شما</p>
            <h1 id="hero-title">
              از پشت‌بام تا <span>موتورخانه</span>، با آچاره
            </h1>
            <p className="hero-lead">
              هر طبقه از ساختمانتان یک کار فنی دارد. همه را یک نفر از آچاره پیگیری می‌کند و آخر ماه یک فاکتور رسمی می‌گیرید.
            </p>
            <dl className="stats">
              <div>
                <Asset src="/landing/icons/wrench.svg" alt="" width={24} height={24} />
                <dt>+۴۳۰,۰۰۰</dt>
                <dd>تعمیر و نگهداری انجام شده</dd>
              </div>
              <div>
                <Asset src="/landing/icons/building-stat.svg" alt="" width={24} height={24} />
                <dt>+۴۷۰</dt>
                <dd>ساختمان خدمت‌رسانی شده</dd>
              </div>
              <div>
                <Asset src="/landing/icons/brush.svg" alt="" width={24} height={24} />
                <dt>+۱,۳۰۰</dt>
                <dd>پروژه نوسازی شده</dd>
              </div>
            </dl>
          </div>

          <figure className="cut" aria-label="برش ساختمان و وضعیت خدمات هر طبقه">
            <div className="halo" aria-hidden="true" />
            <div className="mast">
              <span>آچاره شرکتی</span>
              <i />
            </div>
            <div className="cap" aria-hidden="true" />
            {floors.map((floor, index) => (
              <div className="floor" key={floor.name} style={{ animationDelay: `${0.08 + (floors.length - 1 - index) * 0.07}s` }}>
                <div className="floor-side">
                  {floor.side === "left" ? <FloorLabel floor={floor} /> : null}
                </div>
                <div className="shaft" style={{ background: floor.fill }}>
                  {floor.windows.map((pane, paneIndex) => (
                    <span key={paneIndex} className={`pane pane-${pane}`} />
                  ))}
                </div>
                <div className="floor-side">
                  {floor.side === "right" ? <FloorLabel floor={floor} /> : null}
                </div>
              </div>
            ))}
            <div className="ground-line" aria-hidden="true" />
          </figure>
        </section>

        <section className="customers" id="customers" aria-labelledby="customers-title">
          <div className="wrap reveal">
            <h2 id="customers-title">مشتریان ما</h2>
            <ul className="logo-row">
              <li>
                <Asset src="/landing/logos/sharif.svg" alt="دانشگاه صنعتی شریف" width={84} height={84} />
              </li>
              <li className="logo-fire">
                <Asset src="/landing/logos/fire-mark.svg" alt="" width={61} height={72} />
                <Asset src="/landing/logos/fire-word.svg" alt="سازمان آتش‌نشانی و خدمات ایمنی" width={156} height={17} />
              </li>
              <li>
                <Asset src="/landing/logos/cinnagen.svg" alt="شرکت سیناژن" width={137} height={72} />
              </li>
              <li>
                <Asset src="/landing/logos/hezardastan.svg" alt="هزارستان" width={71} height={80} />
              </li>
              <li>
                <Asset src="/landing/logos/nak.svg" alt="NAK" width={100} height={80} />
              </li>
              <li>
                <Asset src="/landing/logos/tehran.svg" alt="دانشگاه تهران" width={84} height={84} />
              </li>
              <li>
                <Asset src="/landing/logos/mci.svg" alt="همراه اول" width={146} height={60} />
              </li>
            </ul>
          </div>
        </section>

        <section className="band" id="benefits" aria-labelledby="benefits-title">
          <div className="wrap reveal center">
            <p className="eyebrow">چرا آچاره شرکتی</p>
            <h2 id="benefits-title">چه چیزی اضافه می‌شود؟</h2>
            <p className="lede">فرق سفارش معمولی با آچاره شرکتی، در یک نگاه.</p>
            <div className="table-scroll">
              <table className="compare">
                <thead>
                  <tr>
                    <th scope="col" className="col-corp">
                      آچاره شرکتی
                    </th>
                    <th scope="col">سفارش معمولی</th>
                    <th scope="col" className="col-feature">
                      <span className="sr-only">ویژگی</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map(([feature, ordinary]) => (
                    <tr key={feature}>
                      <td className="col-corp">
                        <Asset src="/landing/icons/check.svg" alt="دارد" width={24} height={24} />
                      </td>
                      <td>
                        {ordinary ? (
                          <Asset src="/landing/icons/check-muted.svg" alt="دارد" width={22} height={22} />
                        ) : (
                          <Asset src="/landing/icons/x.svg" alt="ندارد" width={22} height={22} />
                        )}
                      </td>
                      <th scope="row">{feature}</th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="addons" aria-labelledby="addons-title">
          <div className="wrap reveal center">
            <h2 id="addons-title">و چیزهایی که فقط سازمان‌ها لازم دارند</h2>
            <p className="lede">اگر لازم دارید، به همان قرارداد اضافه می‌شوند.</p>
            <ul className="addon-grid">
              {addons.map((item) => (
                <li key={item.title}>
                  <span className="icon-tile">
                    <Asset src={item.icon} width={26} height={26} />
                  </span>
                  <span className="pill">+ آچاره سازمانی</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="band" id="orgs" aria-labelledby="orgs-title">
          <div className="wrap reveal">
            <p className="eyebrow">خدمات بر اساس نیازتان</p>
            <h2 id="orgs-title">ببینید سازمان‌های شبیه شما چه خدماتی می‌گیرند</h2>
            <Organizations />
          </div>
        </section>

        <section className="proof" aria-labelledby="proof-title">
          <div className="wrap reveal">
            <p className="eyebrow">نظر سازمان‌ها</p>
            <h2 id="proof-title">از زبان مشتریان ما</h2>
            <div className="proof-grid">
              <article className="quote-card">
                <div className="rating">
                  <span className="stars" aria-hidden="true">
                    <Asset src="/landing/icons/star.svg" width={24} height={24} />
                    <Asset src="/landing/icons/star.svg" width={24} height={24} />
                    <Asset src="/landing/icons/star.svg" width={24} height={24} />
                    <Asset src="/landing/icons/star.svg" width={24} height={24} />
                    <Asset src="/landing/icons/star.svg" width={24} height={24} />
                  </span>
                  <strong>۴.۸</strong>
                  <span className="rating-note">| بر اساس [X] نظر سازمانی</span>
                </div>
                <blockquote>
                  <footer>
                    <span className="quote-score">
                      ۵.۰
                      <Asset src="/landing/icons/star-sm.svg" alt="" width={18} height={18} />
                    </span>
                  </footer>
                  <p>
                    «قبلاً برای هر کار یک پیمانکار داشتیم. حالا یک نفر از آچاره همه‌چیز را پیگیری می‌کند و آخر ماه یک فاکتور رسمی می‌گیریم.»
                  </p>
                  <cite>
                    [نام و نام خانوادگی]
                    <span>مسئول امور اداری، [نام سازمان]</span>
                  </cite>
                </blockquote>
              </article>
              <div className="film">
                <button type="button" className="play" aria-label="پخش فیلم مشتری">
                  <Asset src="/landing/icons/play.svg" alt="" width={28} height={28} />
                </button>
                <p>فیلم ۹۰ ثانیه‌ای: یک روز آچاره در [نام مشتری]</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta" id="contact" aria-labelledby="cta-title">
          <div className="cta-glow" aria-hidden="true" />
          <div className="wrap cta-grid">
            <div className="cta-copy reveal">
              <p className="eyebrow eyebrow-on-dark">شروع همکاری</p>
              <h2 id="cta-title">سه قدم تا یک سازمان بی‌دردسر</h2>
              <ol>
                <li>
                  <span>۱</span>
                  شماره‌تان را بگذارید
                </li>
                <li>
                  <span>۲</span>
                  کارشناس ما با شما تماس می‌گیرد
                </li>
                <li>
                  <span>۳</span>
                  پیشنهاد متناسب با نیازتان را دریافت می‌کنید
                </li>
              </ol>
            </div>
            <ContactForm />
          </div>
        </section>

        <section className="band services" aria-labelledby="services-title">
          <div className="wrap reveal center">
            <h2 id="services-title">چه کارهایی را می‌توانید بسپارید؟</h2>
            <p className="lede">تقریباً هر کار فنی و خدماتی که در فهرست شماست.</p>
            <ul className="chip-cloud">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
            <p className="chip-note">و هر کار فنی دیگری که در فهرستتان است.</p>
          </div>
        </section>

        <section className="faq" aria-labelledby="faq-title">
          <div className="wrap reveal center">
            <h2 id="faq-title">سوالات متداول</h2>
            <div className="faq-list">
              {faqs.map((item) => (
                <details key={item.q} open>
                  <summary>
                    <Asset src="/landing/icons/minus.svg" alt="" width={24} height={24} />
                    <span>{item.q}</span>
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <Asset src="/landing/logos/wordmark.svg" alt="آچاره" width={73} height={36} />
            <p>آدرس دفتر مرکزی: میدان انقلاب، خیابان کارگر شمالی، بن بست امین، پلاک 5</p>
            <div className="footer-contacts">
              <a href="tel:1471">
                <Asset src="/landing/icons/footer-call.svg" alt="" width={20} height={20} />
                تلفن سراسری ۱۴۷۱
              </a>
              <a href="tel:02154536600">
                <Asset src="/landing/icons/footer-call.svg" alt="" width={20} height={20} />
                ۵۴۵۳۶۶۰۰
              </a>
              <a href="mailto:info@achareh.ir">
                <Asset src="/landing/icons/footer-mail.svg" alt="" width={22} height={20} />
                info[at]achareh.ir
              </a>
            </div>
            <ul className="badges">
              <li>
                <Asset src="/landing/badges/badge-1.png" alt="عضو اتحادیه کشوری کسب و کارهای مجازی" width={66} height={68} />
              </li>
              <li>
                <Asset src="/landing/badges/badge-2.png" alt="نماد ساماندهی" width={66} height={68} />
              </li>
              <li>
                <Asset src="/landing/badges/badge-3.png" alt="نماد اعتماد الکترونیکی" width={66} height={68} />
              </li>
            </ul>
          </div>
          <div className="footer-links">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2>{column.title}</h2>
                <ul>
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="https://achareh.ir">{link}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="wrap footer-bar">
          <p>حقوق مادی و معنوی این سرویس (وب سایت و اپلیکیشن های موبایل) متعلق به ساناگستر سبز (آچاره) است.</p>
          <ul className="socials">
            {socials.map((item) => (
              <li key={item.label}>
                <a href="https://achareh.ir" aria-label={item.label}>
                  <Asset src={item.src} alt="" width={item.w} height={item.h} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}
