import ThemeToggle from "../ui/ThemeToggle";

function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <main className="flex min-h-screen items-start justify-center px-3 py-4 sm:items-center sm:px-6 sm:py-8">
      <section className="w-full max-w-md rounded-2xl border border-slate-300/80 bg-white/80 p-4 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/80 sm:p-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.25em] text-sky-700 dark:text-sky-300">
              MINDSTOCK
            </p>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 sm:text-3xl">
              {title}
            </h1>
          </div>
          <ThemeToggle className="w-full sm:w-auto" />
        </div>
        <p className="mb-6 text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>
        {children}
        {footer ? (
          <div className="mt-6 text-sm text-slate-600 dark:text-slate-300">{footer}</div>
        ) : null}
      </section>
    </main>
  );
}

export default AuthLayout;
