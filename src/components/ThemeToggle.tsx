import { useEffect } from "react";

export default function ForceDarkMode() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  return null; // No UI needed, just enforcing dark mode
}
