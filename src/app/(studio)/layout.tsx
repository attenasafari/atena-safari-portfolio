import "./studio.css";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="studio">
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=boska@400,500&display=swap"
      />
      {children}
    </div>
  );
}
