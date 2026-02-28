import { useState } from "react";
import AuthLayout from "../components/layout/AuthLayout";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import MessageBanner from "../components/ui/MessageBanner";
import { useApi } from "../context/ApiContext";

function VerifyEmailPage({ email, onVerified, onGoLogin }) {
  const { verifyEmail } = useApi();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!code.trim()) {
      setError("Verification code is required.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await verifyEmail(code.trim());
      setSuccess("Email verified. You can login now.");
      onVerified();
    } catch (err) {
      setError(err.message || "Unable to verify email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Verify email"
      subtitle={
        email
          ? `Enter the code sent to ${email}.`
          : "Enter the code sent to your email address."
      }
      footer={
        <p>
          Back to{" "}
          <button
            className="font-semibold text-amber-600 underline transition hover:text-amber-500 dark:text-amber-300 dark:hover:text-amber-200"
            type="button"
            onClick={onGoLogin}
          >
            Login
          </button>
        </p>
      }
    >
      <form className="space-y-3" onSubmit={handleSubmit}>
        <InputField
          id="verify-code"
          label="Verification code"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="6-digit code"
        />
        <MessageBanner type="success" message={success} />
        <MessageBanner type="error" message={error} />
        <Button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify Email"}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default VerifyEmailPage;
