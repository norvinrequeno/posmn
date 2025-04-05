import Menu from "./Menu";

export default function Layout({
  title = "POS",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-white">
      <Menu />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-800">{title}</div>
        </header>
        <main className="flex-1 overflow-y-auto p-10 min-h-95 bg-gray-100 rounded-4xl">
          {children}
        </main>
      </div>
    </div>
  );
}
