import { Asset } from "./asset";

export const contactFormScript = `
document.addEventListener("submit", function (event) {
  var form = event.target;
  if (!form || !form.classList || !form.classList.contains("form-card")) return;
  event.preventDefault();
  var org = String(form.elements.org.value || "").trim();
  var phone = String(form.elements.phone.value || "").trim();
  var error = form.querySelector(".form-error");
  function ensureError() {
    if (error) return error;
    error = document.createElement("p");
    error.className = "form-error";
    error.setAttribute("role", "alert");
    form.insertBefore(error, form.querySelector("button"));
    return error;
  }
  if (org.length < 2) {
    ensureError().textContent = "نام سازمان را بنویسید.";
    return;
  }
  var digits = phone.replace(/[۰-۹]/g, function (digit) {
    return String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit));
  }).replace(/\\D/g, "");
  if (digits.length < 8) {
    ensureError().textContent = "شماره تماس را کامل بنویسید.";
    return;
  }
  form.innerHTML = '<h2>درخواست ثبت شد</h2><p class="form-success">کارشناس آچاره با شما تماس می‌گیرد.</p><p class="form-note">ترجیح می‌دهید خودتان زنگ بزنید؟ <a href="tel:1471">۱۴۷۱</a></p>';
  form.setAttribute("role", "status");
});
`;

export function ContactForm() {
  return (
    <form className="form-card" id="contact-form" noValidate>
      <h2>فرم درخواست تماس</h2>
      <label className="field">
        <span className="sr-only">نام سازمان</span>
        <Asset src="/landing/icons/org.svg" width={24} height={24} />
        <input name="org" type="text" placeholder="نام سازمان" autoComplete="organization" required />
      </label>
      <label className="field">
        <span className="sr-only">شماره تماس</span>
        <Asset src="/landing/icons/call.svg" width={24} height={24} />
        <input name="phone" type="tel" inputMode="tel" placeholder="شماره تماس" autoComplete="tel" required />
      </label>
      <button className="btn btn-block btn-lg" type="submit">
        با من تماس بگیرید
      </button>
      <p className="form-note">
        ترجیح می‌دهید خودتان زنگ بزنید؟ <a href="tel:1471">۱۴۷۱</a>
      </p>
    </form>
  );
}
