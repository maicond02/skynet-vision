"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import type { MenuItem } from "primereact/menuitem";

export default function Navbar() {
    const router = useRouter();

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
    ];

    const start = (
        <Link href="/" className="mr-4 text-lg font-bold tracking-tight text-white">
            SKYNET<span className="text-sky-400">-VISION</span>
        </Link>
    );

    const end = (
        <div className="flex items-center gap-2">
            <Button
                label="Entrar"
                text
                onClick={() => router.push("/auth/login")}
                className="text-white/70 hover:text-white"
            />

            <Button
                label="Cadastrar"
                outlined
                onClick={() => router.push("/auth/register")}
                className="border-sky-400/60 text-sky-300 hover:border-sky-300 hover:bg-sky-400/10 hover:text-sky-200"
            />
        </div>
    );

    return (
        <header className="fixed left-0 top-0 z-50 w-full">
            <style jsx global>{`
                .skynet-navbar.p-menubar {
                    border: none !important;
                    border-radius: 0 !important;
                    background: transparent !important;
                    padding: 1rem 2rem !important;
                    backdrop-filter: none !important;
                    box-shadow: none !important;
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

                @media (max-width: 960px) {
                    .skynet-navbar.p-menubar {
                        padding: 0.85rem 1rem !important;
                    }

                    .skynet-navbar .p-menubar-root-list {
                        border: 1px solid rgba(255, 255, 255, 0.1) !important;
                        border-radius: 1rem !important;
                        background: rgba(18, 18, 18, 0.94) !important;
                        padding: 0.5rem !important;
                        backdrop-filter: blur(16px);
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