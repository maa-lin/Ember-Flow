import type { ThemeKey } from "./Theme";

export interface IThemeContext {
    theme: ThemeKey,
    setTheme: (theme: ThemeKey) => void
};