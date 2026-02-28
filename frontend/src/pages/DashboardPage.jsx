import { useCallback, useEffect, useMemo, useState } from "react";
import IdeaColumn from "../components/ideas/IdeaColumn";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import MessageBanner from "../components/ui/MessageBanner";
import ThemeToggle from "../components/ui/ThemeToggle";
import { IDEA_STATES } from "../constants/ideaStates";
import { useApi } from "../context/ApiContext";

function DashboardPage({ onOpenProfile }) {
  const { fetchIdeas, updateIdeaState, createIdea, logout } = useApi();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingIdeaId, setSavingIdeaId] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createForm, setCreateForm] = useState({
    title: "",
    description: "",
    tags: "",
  });

  const loadIdeas = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const nextIdeas = await fetchIdeas();
      setIdeas(nextIdeas);
    } catch (err) {
      setError(err.message || "Unable to load ideas.");
    } finally {
      setLoading(false);
    }
  }, [fetchIdeas]);

  useEffect(() => {
    loadIdeas();
  }, [loadIdeas]);

  const grouped = useMemo(() => {
    const groups = IDEA_STATES.reduce((acc, state) => {
      acc[state.id] = [];
      return acc;
    }, {});

    ideas.forEach((idea) => {
      if (!groups[idea.state]) {
        groups[idea.state] = [];
      }
      groups[idea.state].push(idea);
    });

    return groups;
  }, [ideas]);

  const changeState = async (ideaId, state) => {
    const previousIdeas = ideas;
    setSavingIdeaId(ideaId);

    setIdeas((current) =>
      current.map((idea) =>
        idea._id === ideaId
          ? {
              ...idea,
              state,
            }
          : idea,
      ),
    );

    try {
      const updated = await updateIdeaState(ideaId, state);
      if (updated?._id) {
        setIdeas((current) =>
          current.map((idea) => (idea._id === updated._id ? updated : idea)),
        );
      }
    } catch (err) {
      setIdeas(previousIdeas);
      setError(err.message || "Unable to update idea state.");
    } finally {
      setSavingIdeaId("");
    }
  };

  const onCreateFieldChange = (key) => (event) => {
    setCreateForm((current) => ({
      ...current,
      [key]: event.target.value,
    }));
  };

  const handleCreateIdea = async (event) => {
    event.preventDefault();
    if (!createForm.title.trim()) {
      setCreateError("Title is required.");
      return;
    }

    setCreating(true);
    setCreateError("");
    try {
      const tags = createForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      const newIdea = await createIdea({
        title: createForm.title.trim(),
        description: createForm.description.trim(),
        tags,
      });

      if (newIdea?._id) {
        setIdeas((current) => [newIdea, ...current]);
      }
      setCreateForm({
        title: "",
        description: "",
        tags: "",
      });
    } catch (err) {
      setCreateError(err.message || "Unable to create idea.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <main className="min-h-screen px-3 py-4 sm:px-4 sm:py-6 lg:px-6">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.25em] text-sky-700 dark:text-sky-300">
              MINDSTOCK
            </p>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100 sm:text-2xl">
              Idea Dashboard
            </h1>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:justify-end">
            <ThemeToggle className="w-full sm:w-28" />
            <Button
              variant="ghost"
              fullWidth={false}
              className="w-full sm:w-28"
              onClick={onOpenProfile}
            >
              Profile
            </Button>
            <Button
              variant="ghost"
              fullWidth={false}
              className="w-full sm:w-28"
              onClick={loadIdeas}
            >
              Refresh
            </Button>
            <Button
              variant="ghost"
              fullWidth={false}
              className="w-full sm:w-28"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </header>

        <MessageBanner type="error" message={error} />
        <section className="mb-4 rounded-2xl border border-slate-300/70 bg-white/70 p-3 backdrop-blur dark:border-slate-700 dark:bg-slate-900/70 sm:p-4">
          <h2 className="mb-3 text-base font-semibold text-slate-900 dark:text-slate-100 sm:text-lg">
            Create Idea
          </h2>
          <form className="grid gap-3 lg:grid-cols-2" onSubmit={handleCreateIdea}>
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Title
              </span>
              <input
                type="text"
                value={createForm.title}
                onChange={onCreateFieldChange("title")}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-amber-300 dark:focus:ring-amber-500/40"
                placeholder="Idea title"
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Tags (comma separated)
              </span>
              <input
                type="text"
                value={createForm.tags}
                onChange={onCreateFieldChange("tags")}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-amber-300 dark:focus:ring-amber-500/40"
                placeholder="saas, ai, tools"
              />
            </label>

            <label className="block space-y-1.5 lg:col-span-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Description
              </span>
              <textarea
                value={createForm.description}
                onChange={onCreateFieldChange("description")}
                className="min-h-20 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-amber-300 dark:focus:ring-amber-500/40"
                placeholder="Optional details"
              />
            </label>

            <div className="lg:col-span-2">
              <MessageBanner type="error" message={createError} />
            </div>

            <div className="lg:col-span-2">
              <Button
                type="submit"
                disabled={creating}
                fullWidth={false}
                className="w-full sm:w-auto"
              >
                {creating ? "Creating..." : "Create Idea"}
              </Button>
            </div>
          </form>
        </section>

        {loading ? (
          <Loader text="Fetching ideas..." />
        ) : (
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {IDEA_STATES.map((state) => (
              <IdeaColumn
                key={state.id}
                title={state.label}
                ideas={grouped[state.id] || []}
                savingIdeaId={savingIdeaId}
                onChangeState={changeState}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default DashboardPage;
