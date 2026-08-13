"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "mediqueue-theme";

export default function ThemeToggle() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        const initial =
            saved === "dark" || saved === "light"
                ? saved
                : window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light";

        document.documentElement.setAttribute("data-theme", initial);
        setTheme(initial);
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", nextTheme);
        window.localStorage.setItem(STORAGE_KEY, nextTheme);
        setTheme(nextTheme);
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle text-green-500"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}
