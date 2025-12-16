import { createContext } from "react";
import type { IThemeContext } from "../models/IThemeContext";

export const ThemeContext = createContext<IThemeContext>({
    theme: "sunrise",
    setTheme: () => {}
});