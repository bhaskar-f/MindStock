import { useState } from "react";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import { useApi } from "./context/ApiContext";

function App() {
  const { isAuthenticated } = useApi();
  const [view, setView] = useState("login");
  const [authedView, setAuthedView] = useState("dashboard");
  const [verifyEmail, setVerifyEmail] = useState("");

  const handleLoginSuccess = () => {
    setView("login");
    setAuthedView("dashboard");
  };

  const handleRegistered = (email) => {
    setVerifyEmail(email);
    setView("verify");
  };

  const handleVerified = () => {
    setView("login");
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-orange-100 via-sky-100 to-indigo-100 text-slate-900 transition-colors duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
        {authedView === "profile" ? (
          <ProfilePage onBack={() => setAuthedView("dashboard")} />
        ) : (
          <DashboardPage onOpenProfile={() => setAuthedView("profile")} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-orange-100 via-sky-100 to-indigo-100 text-slate-900 transition-colors duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      {view === "login" && (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onGoRegister={() => setView("register")}
        />
      )}

      {view === "register" && (
        <RegisterPage
          onRegistered={handleRegistered}
          onGoLogin={() => setView("login")}
        />
      )}

      {view === "verify" && (
        <VerifyEmailPage
          email={verifyEmail}
          onVerified={handleVerified}
          onGoLogin={() => setView("login")}
        />
      )}
    </div>
  );
}

export default App;
