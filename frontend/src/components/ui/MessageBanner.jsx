function MessageBanner({ type = "error", message }) {
  if (!message) {
    return null;
  }

  const styles =
    type === "success"
      ? "border-emerald-300 bg-emerald-100/70 text-emerald-800 dark:border-emerald-500/70 dark:bg-emerald-900/20 dark:text-emerald-300"
      : "border-rose-300 bg-rose-100/70 text-rose-800 dark:border-rose-500/70 dark:bg-rose-900/20 dark:text-rose-300";

  return (
    <p className={`rounded-xl border px-3 py-2 text-sm font-medium ${styles}`}>
      {message}
    </p>
  );
}

export default MessageBanner;
