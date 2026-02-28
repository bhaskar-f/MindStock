import { IDEA_STATES } from "../../constants/ideaStates";

function formatDate(value) {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return date.toLocaleDateString();
}

function IdeaCard({ idea, isSaving, onChangeState }) {
  const tags = Array.isArray(idea.tags) ? idea.tags : [];

  return (
    <article className="space-y-3 rounded-xl border border-slate-300/80 bg-white/75 p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
        {idea.title}
      </h3>
      {idea.description ? (
        <p className="text-sm text-slate-600 dark:text-slate-300">{idea.description}</p>
      ) : null}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {formatDate(idea.createdAt || idea.updatedAt)}
        </span>
        <select
          className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-amber-300 dark:focus:ring-amber-500/40"
          value={idea.state}
          onChange={(event) => onChangeState(idea._id, event.target.value)}
          disabled={isSaving}
        >
          {IDEA_STATES.map((state) => (
            <option key={state.id} value={state.id}>
              {state.label}
            </option>
          ))}
        </select>
      </div>
      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={`${idea._id}-${tag}`}
              className="rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-medium text-sky-700 dark:bg-sky-900/40 dark:text-sky-300"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export default IdeaCard;
