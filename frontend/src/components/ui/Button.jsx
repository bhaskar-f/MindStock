function Button({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  onClick,
  fullWidth = true,
  className = "",
}) {
  const variantClass =
    variant === "ghost"
      ? "border border-slate-300 bg-white/70 text-slate-700 hover:bg-white dark:border-slate-600 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-700/80"
      : "border border-amber-300 bg-gradient-to-r from-amber-300 to-orange-300 text-slate-900 hover:from-amber-200 hover:to-orange-200 dark:border-amber-400 dark:from-amber-200 dark:to-orange-300";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        "inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variantClass,
        fullWidth ? "w-full" : "w-auto",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default Button;
