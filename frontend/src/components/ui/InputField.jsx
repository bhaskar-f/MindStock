function InputField({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  autoComplete,
}) {
  return (
    <label className="block space-y-2">
      <span className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </span>
      <input
        id={id}
        className="w-full rounded-xl border border-slate-300 bg-white/80 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300 dark:border-slate-600 dark:bg-slate-800/70 dark:text-slate-100 dark:focus:border-amber-300 dark:focus:ring-amber-500/40"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
      />
    </label>
  );
}

export default InputField;
