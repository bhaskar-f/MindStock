import { useState } from "react";
import AuthLayout from "../components/layout/AuthLayout";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import MessageBanner from "../components/ui/MessageBanner";
import { useApi } from "../context/ApiContext";

const ROLES = ["builder", "founder", "designer", "writer", "investor"];

function RegisterPage({ onRegistered, onGoLogin }) {
  const { register } = useApi();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "builder",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("Name, email, and password are required.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await register(form);
      setSuccess("Account created. Check your email for the verification code.");
      onRegistered(form.email);
    } catch (err) {
      setError(err.message || "Unable to register.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Register, then verify your email to unlock login."
      footer={
        <p>
          Already have an account?{" "}
          <button
            className="font-semibold text-amber-600 underline transition hover:text-amber-500 dark:text-amber-300 dark:hover:text-amber-200"
            type="button"
            onClick={onGoLogin}
          >
            Log in
          </button>
        </p>
      }
    >
      <form className="space-y-3" onSubmit={handleSubmit}>
        <InputField
          id="register-name"
          label="Name"
          value={form.name}
          onChange={updateField("name")}
          placeholder="Your name"
          autoComplete="name"
        />
        <InputField
          id="register-email"
          label="Email"
          type="email"
          value={form.email}
          onChange={updateField("email")}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <InputField
          id="register-password"
          label="Password"
          type="password"
          value={form.password}
          onChange={updateField("password")}
          placeholder="At least 6 characters"
          autoComplete="new-password"
        />
        <label className="block space-y-2">
          <span className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Role
          </span>
          <select
            className="w-full rounded-xl border border-slate-300 bg-white/80 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300 dark:border-slate-600 dark:bg-slate-800/70 dark:text-slate-100 dark:focus:border-amber-300 dark:focus:ring-amber-500/40"
            value={form.role}
            onChange={updateField("role")}
          >
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>
        <MessageBanner type="success" message={success} />
        <MessageBanner type="error" message={error} />
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;
