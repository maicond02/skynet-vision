"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import type { Menu as MenuType } from "primereact/menu";

export default function Topbar() {
	const router = useRouter();
	const menuRef = useRef<MenuType>(null);
	const [userInitial, setUserInitial] = useState("U");

	useEffect(() => {
		const savedUser = localStorage.getItem("user");

		if (!savedUser) {
			setUserInitial("U");
			return;
		}

		try {
			const user = JSON.parse(savedUser);
			const email = user?.email as string | undefined;

			if (email) {
				setUserInitial(email.charAt(0).toUpperCase());
			}
		} catch {
			setUserInitial("U");
		}
	}, []);

	const menuItems = [
		{
			label: "Sair",
			icon: "pi pi-sign-out",
			command: () => {
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				router.push("/auth/login");
			},
		},
	];

	return (
		<header className="sticky top-0 z-[999] border-b border-white/10 bg-black px-4 py-4 lg:px-6">
			<style jsx global>{`
				.dashboard-search .p-inputtext {
					width: 100%;
					background: rgba(255, 255, 255, 0.08);
					border: 1px solid rgba(255, 255, 255, 0.15);
					color: #fff;
					border-radius: 10px;
					padding: 0.75rem 1rem 0.75rem 2.5rem;
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

			<div className="flex items-center justify-end gap-4">
				<div className="dashboard-search relative hidden w-full max-w-[420px] sm:block">
					<i className="pi pi-search absolute left-3 top-1/2 z-10 -translate-y-1/2 text-white/60" />
					<InputText placeholder="Buscar..." className="w-full" />
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

				<Menu ref={menuRef} model={menuItems} popup />
			</div>
		</header>
	);
}
