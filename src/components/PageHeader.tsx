type PageHeaderProps = {
  title: string;
  description: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mx-auto w-full max-w-[var(--content-max)] px-[var(--page-pad)] pt-6 pb-10 sm:pt-10">
      <h1 className="max-w-3xl font-[family-name:var(--font-fredoka)] text-4xl font-semibold tracking-tight text-[var(--ink)] sm:text-5xl md:text-6xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--ink-muted)]">
        {description}
      </p>
    </header>
  );
}
