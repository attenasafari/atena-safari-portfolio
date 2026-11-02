import { Asset } from "./asset";

const groups = [
  {
    chip: "هر روز و هر هفته",
    items: ["نظافت روزانه و پذیرایی", "نیروی ثابت و غربال‌شده در محل"],
  },
  {
    chip: "وقتی چیزی خراب می‌شود",
    items: ["تعمیرات برق، لوله‌کشی و سرمایش", "خدمات فوری با پشتیبانی ۲۴ ساعته"],
  },
  {
    chip: "گاه‌به‌گاه",
    items: ["جابه‌جایی دفتر و بازسازی", "خدمات سلامت و کارت هدیه کارکنان"],
  },
] as const;

const orgs = [
  {
    id: "tower",
    label: "برج و مجتمع اداری",
    panel: "برای برج و مجتمع اداری",
    icon: "/landing/icons/tower.svg",
  },
  {
    id: "store",
    label: "فروشگاه و شعب",
    panel: "برای فروشگاه و شعب",
    icon: "/landing/icons/store.svg",
  },
  {
    id: "office",
    label: "دفتر و شرکت",
    panel: "برای دفتر و شرکت‌ها",
    icon: "/landing/icons/briefcase.svg",
  },
] as const;

function Panel({ org }: { org: (typeof orgs)[number] }) {
  return (
    <div className={`org-panel panel-${org.id}`} id={`org-panel-${org.id}`}>
      <div className="org-panel-head">
        <span className="icon-tile icon-tile-lg">
          <Asset src={org.icon} width={28} height={28} />
        </span>
        <div>
          <h3>{org.panel}</h3>
          <p>معمولاً این کارها را برایتان انجام می‌دهیم</p>
        </div>
      </div>
      <div className="org-groups">
        {groups.map((group) => (
          <div key={group.chip} className="org-group">
            <span className="pill">{group.chip}</span>
            <ul>
              {group.items.map((item) => (
                <li key={item}>
                  <Asset src="/landing/icons/check-sm.svg" width={18} height={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <a className="btn btn-block" href="#contact">
          درخواست تماس کارشناس
        </a>
      </div>
    </div>
  );
}

export function Organizations() {
  return (
    <div className="orgs">
      {orgs.map((org) => (
        <input
          key={org.id}
          className="org-radio"
          type="radio"
          name="organization"
          id={`org-${org.id}`}
          defaultChecked={org.id === "office"}
        />
      ))}
      <div className="org-tiles" role="radiogroup" aria-label="نوع سازمان">
        {orgs.map((org) => (
          <label key={org.id} className="org-tile" htmlFor={`org-${org.id}`}>
            <span className="icon-tile">
              <Asset src={org.icon} width={26} height={26} />
            </span>
            {org.label}
          </label>
        ))}
      </div>
      {orgs.map((org) => (
        <Panel key={org.id} org={org} />
      ))}
      <p className="org-note">
        سازمانتان در فهرست نیست؟ همه این خدمات برای هر سازمانی ارائه می‌شود.
      </p>
    </div>
  );
}
