"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

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

	function isRouteActive(route: string) {
		return pathname === route || pathname.startsWith(`${route}/`);
	}

	function handleLogout() {
		logoutLocalUser();
		router.push("/auth/login");
	}

	return (
		<aside className="fixed inset-y-0 left-0 z-[1000] hidden w-[280px] flex-col border-r border-white/10 bg-black/40 text-slate-200 backdrop-blur-md lg:flex">
			<div className="flex items-center gap-3 p-4 text-[1.2rem] font-bold tracking-wide text-zinc-50">
				<i className="pi pi-shield text-[1.3rem]" />
				<span>Skynet</span>
			</div>

			<nav className="flex-1 overflow-y-auto px-3 pt-2">
				<ul className="m-0 flex list-none flex-col gap-1.5 p-0">
					{sidebarItems.map((item) => {
						const active = isRouteActive(item.route);

						return (
							<li key={item.route}>
								<Link
									href={item.route}
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
	);
}
