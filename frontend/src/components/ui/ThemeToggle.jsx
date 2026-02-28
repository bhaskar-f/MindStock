import { useTheme } from "../../context/ThemeContext";
import Button from "./Button";

function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="ghost"
      fullWidth={false}
      onClick={toggleTheme}
      className={className}
    >
      {theme === "dark" ? "Light" : "Dark"} Mode
    </Button>
  );
}

export default ThemeToggle;
