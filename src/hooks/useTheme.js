// src/hooks/useTheme.js
import { useContext } from "react";
import ThemeContext from "../utils/ThemeContext";

export default function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }
  return [context.theme, context.setTheme];
}
