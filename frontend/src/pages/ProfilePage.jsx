import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import MessageBanner from "../components/ui/MessageBanner";
import ThemeToggle from "../components/ui/ThemeToggle";
import { useApi } from "../context/ApiContext";

const ROLES = ["builder", "founder", "designer", "writer", "investor"];

function ProfilePage({ onBack }) {
  const { user, getProfile, updateProfile } = useApi();
  const [profile, setProfile] = useState(() => user || null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: user?.name || "",
    role: user?.role || "builder",
    bio: user?.bio || "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getProfile();
        const nextProfile = data || null;
        setProfile((current) => nextProfile || current);
        if (nextProfile) {
          setForm({
            name: nextProfile.name || "",
            role: nextProfile.role || "builder",
            bio: nextProfile.bio || "",
          });
        }
      } catch (err) {
        setError(err.message || "Unable to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [getProfile]);

  const updateField = (key) => (event) => {
    setForm((current) => ({
      ...current,
      [key]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");
    try {
      const updated = await updateProfile({
        name: form.name.trim(),
        role: form.role,
        bio: form.bio.trim(),
      });
      setProfile(updated);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen px-3 py-4 sm:px-4 sm:py-6 lg:px-6">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.25em] text-sky-700 dark:text-sky-300">
              MINDSTOCK
            </p>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100 sm:text-2xl">
              Profile
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Manage your account details.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-2 sm:w-auto sm:grid-cols-2">
            <ThemeToggle className="w-full sm:w-40" />
            <Button
              variant="ghost"
              fullWidth={false}
              className="w-full sm:w-40"
              onClick={onBack}
            >
              Back to Dashboard
            </Button>
          </div>
        </header>

        {loading ? (
          <Loader text="Fetching profile..." />
        ) : (
          <section className="rounded-2xl border border-slate-300/70 bg-white/70 p-3 backdrop-blur dark:border-slate-700 dark:bg-slate-900/70 sm:p-4">
            <form className="grid gap-3 md:grid-cols-2" onSubmit={handleSubmit}>
              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Name
                </span>
                <input
                  type="text"
                  value={form.name}
                  onChange={updateField("name")}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-amber-300 dark:focus:ring-amber-500/40"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </span>
                <input
                  type="email"
                  value={profile?.email || user?.email || ""}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-3 py-2.5 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300"
                />
              </label>

              <label className="block space-y-1.5 md:col-span-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Role
                </span>
                <select
                  value={form.role}
                  onChange={updateField("role")}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-amber-300 dark:focus:ring-amber-500/40"
                >
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block space-y-1.5 md:col-span-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Bio
                </span>
                <textarea
                  value={form.bio}
                  onChange={updateField("bio")}
                  className="min-h-24 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-amber-300 dark:focus:ring-amber-500/40"
                  placeholder="Add a short bio"
                />
              </label>

              <div className="md:col-span-2">
                <MessageBanner type="success" message={message} />
                <MessageBanner type="error" message={error} />
              </div>

              <div className="md:col-span-2">
                <Button
                  type="submit"
                  disabled={saving}
                  fullWidth={false}
                  className="w-full sm:w-auto"
                >
                  {saving ? "Saving..." : "Save Profile"}
                </Button>
              </div>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}

export default ProfilePage;
