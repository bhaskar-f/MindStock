import { useState } from "react";
import AuthLayout from "../components/layout/AuthLayout";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import MessageBanner from "../components/ui/MessageBanner";
import { useApi } from "../context/ApiContext";

function LoginPage({ onLoginSuccess, onGoRegister }) {
  const { login } = useApi();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await login(form);
      onLoginSuccess();
    } catch (err) {
      setError(err.message || "Unable to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Log in"
      subtitle="Use your verified account to open your idea board."
      footer={
        <p>
          New here?{" "}
          <button
            className="font-semibold text-amber-600 underline transition hover:text-amber-500 dark:text-amber-300 dark:hover:text-amber-200"
            type="button"
            onClick={onGoRegister}
          >
            Create an account
          </button>
        </p>
      }
    >
      <form className="space-y-3" onSubmit={handleSubmit}>
        <InputField
          id="login-email"
          label="Email"
          type="email"
          value={form.email}
          onChange={updateField("email")}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <InputField
          id="login-password"
          label="Password"
          type="password"
          value={form.password}
          onChange={updateField("password")}
          placeholder="Your password"
          autoComplete="current-password"
        />
        <MessageBanner type="error" message={error} />
        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
