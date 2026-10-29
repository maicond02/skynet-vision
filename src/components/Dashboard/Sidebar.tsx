"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { logoutLocalUser } from "../../features/auth/services/auth.service";

type SidebarItem = {
	label: string;
	icon: string;
	route: string;
};

const sidebarItems: SidebarItem[] = [
	{ label: "Dashboard", icon: "pi-home", route: "/dashboard" },
	{ label: "Incidentes", icon: "pi-exclamation-triangle", route: "/incidents" },
	{ label: "Configurações", icon: "pi-cog", route: "/config" },
	{ label: "Relatórios", icon: "pi-chart-bar", route: "/reports" },
	{ label: "Usuários", icon: "pi-users", route: "/users" },
];

export default function Sidebar() {
	const pathname = usePathname();
	const router = useRouter();
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		if (!mobileOpen) return;
		function closeOnEscape(event: KeyboardEvent) {
			if (event.key === "Escape") setMobileOpen(false);
		}
		window.addEventListener("keydown", closeOnEscape);
		return () => window.removeEventListener("keydown", closeOnEscape);
	}, [mobileOpen]);

	function isRouteActive(route: string) {
		return pathname === route || pathname.startsWith(`${route}/`);
	}

	function handleLogout() {
		setMobileOpen(false);
		logoutLocalUser();
		router.push("/auth/login");
	}

	return (
		<>
			<button
				type="button"
				aria-label="Abrir menu de navegação"
				aria-expanded={mobileOpen}
				aria-controls="dashboard-navigation"
				onClick={() => setMobileOpen(true)}
				className="dashboard-mobile-trigger fixed left-4 top-4 z-[1001] flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-black text-white lg:hidden"
			>
				<i className="pi pi-bars" aria-hidden="true" />
			</button>
			{mobileOpen && (
				<button
					type="button"
					aria-label="Fechar menu de navegação"
					onClick={() => setMobileOpen(false)}
					className="fixed inset-0 z-[1002] bg-black/70 lg:hidden"
				/>
			)}
		<aside id="dashboard-navigation" className={`dashboard-sidebar fixed inset-y-0 left-0 z-[1003] w-[min(280px,85vw)] flex-col border-r border-white/10 bg-black text-slate-200 backdrop-blur-md lg:z-[1000] lg:flex lg:w-[280px] ${mobileOpen ? "flex" : "hidden"}`}>
			<div className="flex items-center gap-3 p-4">
				<Link href="/" onClick={() => setMobileOpen(false)} className="skynet-brand text-lg font-bold tracking-tight text-white no-underline">
					SKYNET<span className="text-sky-400">-VISION</span>
				</Link>
				<button type="button" onClick={() => setMobileOpen(false)} aria-label="Fechar menu" className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-200 lg:hidden">
					<i className="pi pi-times" aria-hidden="true" />
				</button>
			</div>

			<nav className="flex-1 overflow-y-auto px-3 pt-2">
				<ul className="m-0 flex list-none flex-col gap-1.5 p-0">
					{sidebarItems.map((item) => {
						const active = isRouteActive(item.route);

						return (
							<li key={item.route}>
								<Link
									href={item.route}
									onClick={() => setMobileOpen(false)}
									className={`flex items-center gap-3 rounded-lg p-3 text-gray-300 no-underline transition-colors hover:bg-white/10 hover:text-white ${
										active ? "bg-white/20 font-medium text-white" : ""
									}`}
								>
									<i className={`pi ${item.icon} text-[1.1rem]`} />
									<span className="whitespace-nowrap text-[0.95rem]">
										{item.label}
									</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>

			<div className="mt-auto px-3 py-4">
				<button
					type="button"
					onClick={handleLogout}
					className="w-full rounded-lg px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10"
				>
					<i className="pi pi-sign-out mr-2 align-[-2px]" />
					Sair
				</button>
			</div>
		</aside>
		</>
	);
}
