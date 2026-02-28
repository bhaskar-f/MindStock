import IdeaCard from "./IdeaCard";

function IdeaColumn({ title, ideas, savingIdeaId, onChangeState }) {
  return (
    <section className="min-h-56 rounded-2xl border border-slate-300/70 bg-white/70 p-3 backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
      <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-700">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
          {ideas.length}
        </span>
      </div>
      <div className="grid gap-2">
        {ideas.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No ideas in this stage.
          </p>
        ) : (
          ideas.map((idea) => (
            <IdeaCard
              key={idea._id}
              idea={idea}
              isSaving={savingIdeaId === idea._id}
              onChangeState={onChangeState}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default IdeaColumn;
