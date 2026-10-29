"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import type { Menu as MenuType } from "primereact/menu";

import {
	getAuthenticatedUser,
	logoutLocalUser,
} from "../../features/auth/services/auth.service";
import { useTheme } from "../../providers/theme-provider";

const searchPages = [
	{ label: "Dashboard", route: "/dashboard", icon: "pi-home", keywords: "inicio monitoramento cameras status" },
	{ label: "Incidentes", route: "/incidents", icon: "pi-exclamation-triangle", keywords: "alertas eventos deteccoes" },
	{ label: "Configurações", route: "/config", icon: "pi-cog", keywords: "ajustes preferencias" },
	{ label: "Relatórios", route: "/reports", icon: "pi-chart-bar", keywords: "analise dados estatisticas exportar" },
	{ label: "Usuários", route: "/users", icon: "pi-users", keywords: "pessoas acesso contas cadastrar" },
];

function normalizeSearch(value: string) {
	return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export default function Topbar() {
	const router = useRouter();
	const { theme, toggleTheme } = useTheme();
	const menuRef = useRef<MenuType>(null);
	const searchRef = useRef<HTMLDivElement>(null);
	const [userInitial, setUserInitial] = useState("U");
	const [searchQuery, setSearchQuery] = useState("");
	const [searchOpen, setSearchOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const normalizedQuery = normalizeSearch(searchQuery);
	const searchResults = normalizedQuery
		? searchPages.filter((item) => normalizeSearch(`${item.label} ${item.keywords}`).includes(normalizedQuery))
		: searchPages;

	function navigateToSearchResult(route: string) {
		setSearchOpen(false);
		setSearchQuery("");
		setSelectedIndex(0);
		router.push(route);
	}

	useEffect(() => {
		function closeOnOutsideClick(event: MouseEvent) {
			if (!searchRef.current?.contains(event.target as Node)) setSearchOpen(false);
		}
		document.addEventListener("mousedown", closeOnOutsideClick);
		return () => document.removeEventListener("mousedown", closeOnOutsideClick);
	}, []);

	useEffect(() => {
		const user = getAuthenticatedUser();

		if (!user) {
			router.replace("/auth/login");
			return;
		}

		setUserInitial((user.name || user.email).charAt(0).toUpperCase());
	}, [router]);

	useEffect(() => {
		function handleStorageChange() {
			const user = getAuthenticatedUser();
			setUserInitial(user ? (user.name || user.email).charAt(0).toUpperCase() : "U");
		}

		window.addEventListener("storage", handleStorageChange);
		handleStorageChange();

		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, []);

	const menuItems = [
		{
			label: "Sair",
			icon: "pi pi-sign-out",
			command: () => {
				logoutLocalUser();
				router.push("/auth/login");
			},
		},
	];

	return (
		<header className="dashboard-topbar sticky top-0 z-[999] border-b border-white/10 bg-black px-4 py-4 lg:px-6">
			<style jsx global>{`
				.dashboard-search .p-inputtext {
					width: 100%;
					background: rgba(255, 255, 255, 0.08);
					border: 1px solid rgba(255, 255, 255, 0.15);
					color: #fff;
					border-radius: 10px;
					padding: 0.75rem 1rem 0.75rem 2.5rem;
				}

				.dashboard-topbar .dashboard-search .p-inputtext {
					padding-left: 2.75rem !important;
				}

				.dashboard-search .p-inputtext::placeholder {
					color: rgba(255, 255, 255, 0.5);
				}

				.dashboard-search .p-inputtext:focus {
					background: rgba(255, 255, 255, 0.12);
					border-color: #3ea1ff;
					box-shadow: 0 0 0 3px rgba(62, 161, 255, 0.15);
				}
			`}</style>

			<div className="flex flex-wrap items-center justify-end gap-2 pl-12 sm:flex-nowrap sm:gap-4 lg:pl-0">
				<button
					type="button"
					aria-label={`Ativar tema ${theme === "dark" ? "claro" : "escuro"}`}
					aria-pressed={theme === "light"}
					onClick={toggleTheme}
					className="theme-switch"
				>
					<i className={`pi ${theme === "dark" ? "pi-sun" : "pi-moon"}`} aria-hidden="true" />
					<span>{theme === "dark" ? "Claro" : "Escuro"}</span>
				</button>
				<div ref={searchRef} className="dashboard-search relative order-last w-full min-w-0 sm:order-none sm:max-w-[420px]">
					<form className="relative" onSubmit={(event) => {
						event.preventDefault();
						const result = searchResults[selectedIndex] ?? searchResults[0];
						if (result) navigateToSearchResult(result.route);
					}}>
						<i className="pi pi-search pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-white/60" aria-hidden="true" />
						<InputText
							type="search"
							value={searchQuery}
							onChange={(event) => { setSearchQuery(event.target.value); setSelectedIndex(0); setSearchOpen(true); }}
							onFocus={() => setSearchOpen(true)}
							onKeyDown={(event) => {
								if (event.key === "Escape") { setSearchOpen(false); event.currentTarget.blur(); }
								if (event.key === "ArrowDown" && searchResults.length) { event.preventDefault(); setSelectedIndex((index) => (index + 1) % searchResults.length); }
								if (event.key === "ArrowUp" && searchResults.length) { event.preventDefault(); setSelectedIndex((index) => (index - 1 + searchResults.length) % searchResults.length); }
							}}
							placeholder="Buscar páginas..."
							aria-label="Buscar páginas do painel"
							role="combobox"
							aria-expanded={searchOpen}
							aria-controls="dashboard-search-results"
							aria-autocomplete="list"
							className="w-full"
						/>
					</form>
					{searchOpen && (
						<div id="dashboard-search-results" role="listbox" aria-label="Páginas encontradas" className="dashboard-search-results absolute left-0 top-full z-[1010] mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-white/15 bg-zinc-950 p-2 shadow-2xl">
							{searchResults.length ? searchResults.map((item, index) => (
								<button
									key={item.route}
									type="button"
									role="option"
									aria-selected={index === selectedIndex}
									onMouseEnter={() => setSelectedIndex(index)}
									onClick={() => navigateToSearchResult(item.route)}
									className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-200 hover:bg-white/10 ${index === selectedIndex ? "bg-white/10" : ""}`}
								>
									<i className={`pi ${item.icon} text-sky-400`} aria-hidden="true" />
									{item.label}
								</button>
							)) : <p className="m-0 px-3 py-2 text-sm text-slate-400">Nenhuma página encontrada.</p>}
						</div>
					)}
				</div>

				<div className="relative">
					<Button
						icon="pi pi-bell"
						text
						rounded
						severity="secondary"
						className="text-white/80 hover:bg-white/10"
					/>
					<span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[0.7rem] font-bold text-white">
						4
					</span>
				</div>

				<Avatar
					label={userInitial}
					size="large"
					shape="circle"
					onClick={(event) => menuRef.current?.toggle(event)}
					className="cursor-pointer border-2 border-white/20 bg-gradient-to-br from-sky-400 to-violet-600 font-semibold text-white transition hover:scale-105"
				/>

				<Menu
					ref={menuRef}
					model={menuItems}
					popup
					className={theme === "light" ? "dashboard-user-menu-light" : undefined}
				/>
			</div>
		</header>
	);
}
