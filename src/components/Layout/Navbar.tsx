"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import type { MenuItem } from "primereact/menuitem";
import { useTheme } from "../../providers/theme-provider";

export default function Navbar() {
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();

    const items: MenuItem[] = [
        {
            label: "Início",
            icon: "pi pi-home",
            url: "/",
        },
        {
            label: "Recursos",
            icon: "pi pi-star",
            url: "#features",
        },
        {
            label: "Dashboard",
            icon: "pi pi-chart-line",
            url: "/dashboard",
        },
        {
            label: "Câmeras",
            icon: "pi pi-video",
            url: "/cameras",
        },
        {
            label: "Detecções",
            icon: "pi pi-eye",
            url: "/detections",
        },
        {
            label: "Contato",
            icon: "pi pi-envelope",
            url: "#contact",
        },
        { label: "Entrar", icon: "pi pi-sign-in", url: "/auth/login", className: "mobile-auth-item" },
        { label: "Cadastrar", icon: "pi pi-user-plus", url: "/auth/register", className: "mobile-auth-item" },
    ];

    const start = (
        <Link href="/" className="skynet-brand mr-2 text-base font-bold tracking-tight text-white sm:mr-4 sm:text-lg">
            SKYNET<span className="text-sky-400">-VISION</span>
        </Link>
    );

    const end = (
        <div className="skynet-navbar-actions flex items-center gap-2">
            <button
                type="button"
                aria-label={`Ativar tema ${theme === "dark" ? "claro" : "escuro"}`}
                aria-pressed={theme === "light"}
                onClick={toggleTheme}
                className="theme-switch navbar-theme-switch"
            >
                <i className={`pi ${theme === "dark" ? "pi-sun" : "pi-moon"}`} aria-hidden="true" />
                <span>{theme === "dark" ? "Claro" : "Escuro"}</span>
            </button>

            <Button
                label="Entrar"
                text
                onClick={() => router.push("/auth/login")}
                className="navbar-auth-button text-white/70 hover:text-white"
            />

            <Button
                label="Cadastrar"
                outlined
                onClick={() => router.push("/auth/register")}
                className="navbar-auth-button border-sky-400/60 text-sky-300 hover:border-sky-300 hover:bg-sky-400/10 hover:text-sky-200"
            />
        </div>
    );

    return (
        <header className="fixed left-0 top-0 z-50 w-full">
            <style jsx global>{`
                .skynet-navbar.p-menubar {
                    border: none !important;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
                    border-radius: 0 !important;
                    background: rgba(7, 12, 22, 0.88) !important;
                    padding: 1rem 2rem !important;
                    backdrop-filter: blur(18px) saturate(150%) !important;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16) !important;
                }

                .skynet-navbar .p-menubar-root-list {
                    gap: 0.25rem;
                }

                .skynet-navbar .p-menuitem-link {
                    border-radius: 999px !important;
                    background: transparent !important;
                    color: rgba(255, 255, 255, 0.68) !important;
                    transition:
                        background 0.2s ease,
                        color 0.2s ease;
                }

                .skynet-navbar .p-menuitem-link:hover {
                    background: rgba(255, 255, 255, 0.08) !important;
                    color: #ffffff !important;
                }

                .skynet-navbar .p-menuitem-icon,
                .skynet-navbar .p-menuitem-text {
                    color: inherit !important;
                }

                .skynet-navbar .p-menubar-button {
                    color: rgba(255, 255, 255, 0.78) !important;
                    border-radius: 999px !important;
                }

                .skynet-navbar .p-menubar-button:hover {
                    background: rgba(255, 255, 255, 0.08) !important;
                    color: #ffffff !important;
                }

                .skynet-navbar .p-submenu-list {
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    border-radius: 1rem !important;
                    background: rgba(18, 18, 18, 0.92) !important;
                    padding: 0.5rem !important;
                    backdrop-filter: blur(16px);
                }

                .skynet-navbar .p-button.p-button-text {
                    color: rgba(255, 255, 255, 0.72) !important;
                }

                .skynet-navbar .p-button.p-button-text:hover {
                    background: rgba(255, 255, 255, 0.08) !important;
                    color: #ffffff !important;
                }

                @media (min-width: 961px) {
                    .skynet-navbar .mobile-auth-item { display: none !important; }
                }

                @media (max-width: 960px) {
                    .skynet-navbar.p-menubar {
                        padding: 0.85rem 1rem !important;
                    }

                    .skynet-navbar.p-menubar .p-menubar-root-list {
                        border: 1px solid rgba(255, 255, 255, 0.1) !important;
                        border-radius: 1rem !important;
                        background: rgba(18, 18, 18, 0.94) !important;
                        padding: 0.5rem !important;
                        backdrop-filter: blur(16px);
                    }

                    .skynet-navbar .navbar-auth-button { display: none !important; }
                    .skynet-navbar .navbar-theme-switch { width: 2.75rem; min-width: 2.75rem; padding: 0; justify-content: center; }
                    .skynet-navbar .navbar-theme-switch span { display: none; }
                    .skynet-navbar .p-menubar-button { order: 3; flex-shrink: 0; }
                    .skynet-navbar .p-menubar-end { order: 2; margin-left: auto; }
                    .theme-light .skynet-navbar.p-menubar .p-menubar-root-list {
                        background: rgba(255, 255, 255, 0.96) !important;
                        border-color: rgba(15, 23, 42, 0.12) !important;
                    }
                }
            `}</style>

            <Menubar
                model={items}
                start={start}
                end={end}
                className="skynet-navbar"
            />
        </header>
    );
}
