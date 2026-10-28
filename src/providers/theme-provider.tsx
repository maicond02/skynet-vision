"use client";

import {
    createContext,
    type ReactNode,
    useContext,
    useSyncExternalStore,
} from "react";

type Theme = "dark" | "light";

type ThemeContextValue = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const THEME_STORAGE_KEY = "skynet-vision-theme";
const themeListeners = new Set<() => void>();

function getStoredTheme(): Theme {
    if (typeof window === "undefined") {
        return "dark";
    }

    return window.localStorage.getItem(THEME_STORAGE_KEY) === "light" ? "light" : "dark";
}

function subscribeToTheme(listener: () => void) {
    themeListeners.add(listener);
    window.addEventListener("storage", listener);

    return () => {
        themeListeners.delete(listener);
        window.removeEventListener("storage", listener);
    };
}

function setStoredTheme(theme: Theme) {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    themeListeners.forEach((listener) => listener());
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const theme = useSyncExternalStore(subscribeToTheme, getStoredTheme, (): Theme => "dark");
    const value: ThemeContextValue = {
        theme,
        toggleTheme: () => setStoredTheme(theme === "dark" ? "light" : "dark"),
    };

    return (
        <ThemeContext.Provider value={value}>
            <div className={theme === "light" ? "theme-light" : "theme-dark"}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme precisa ser usado dentro de ThemeProvider.");
    }

    return context;
}
