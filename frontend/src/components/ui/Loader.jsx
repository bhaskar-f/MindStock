function Loader({ text = "Loading..." }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-slate-300 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-800/70 dark:text-slate-200">
      <span
        className="h-2.5 w-2.5 animate-pulse rounded-full bg-amber-400 shadow-[0_0_16px_rgba(251,191,36,0.9)]"
        aria-hidden="true"
      />
      <span>{text}</span>
    </div>
  );
}

export default Loader;
