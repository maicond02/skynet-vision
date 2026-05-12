"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import type { Menu as MenuType } from "primereact/menu";
import { Tag } from "primereact/tag";

type StatusLevel = "HIGH" | "MILD" | "NONE" | "ERROR" | string;

type DashboardStatus = {
	level: StatusLevel;
	max_confidence: number;
	detections: number;
	alert: string;
	logs: string[];
};

type SidebarItem = {
	label: string;
	icon: string;
	route: string;
};

const API_BASE_URL = "http://localhost:8001";

const sidebarItems: SidebarItem[] = [
	{ label: "Dashboard", icon: "pi-home", route: "/dashboard" },
	{ label: "Incidentes", icon: "pi-exclamation-triangle", route: "/incidents" },
	{ label: "Configurações", icon: "pi-cog", route: "/settings" },
	{ label: "Relatórios", icon: "pi-chart-bar", route: "/reports" },
	{ label: "Usuários", icon: "pi-users", route: "/team-management" },
];

function getFormattedDate() {
	return new Date().toLocaleDateString("pt-BR", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

function getFormattedTime() {
	return new Date().toLocaleTimeString("pt-BR");
}

function getSeverityTag(level: StatusLevel) {
	switch (level) {
		case "HIGH":
			return "danger";
		case "MILD":
			return "warning";
		case "NONE":
			return "success";
		case "ERROR":
			return "danger";
		default:
			return "info";
	}
}

function Sidebar() {
	const pathname = usePathname();
	const router = useRouter();

	function isRouteActive(route: string) {
		return pathname === route || pathname.startsWith(`${route}/`);
	}

	function handleLogout() {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
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

function Topbar() {
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

export default function DashboardPage() {
	const videoFeedUrl = `${API_BASE_URL}/video_feed`;

	const [currentTime, setCurrentTime] = useState(getFormattedTime());
	const [currentDate, setCurrentDate] = useState(getFormattedDate());
	const [uptime] = useState("2h 34m");
	const [isConnected, setIsConnected] = useState(true);

	const [status, setStatus] = useState<DashboardStatus>({
		level: "NONE",
		max_confidence: 0,
		detections: 0,
		alert: "",
		logs: [],
	});

	const isRecording = useMemo(() => {
		return status.level === "HIGH" || status.level === "MILD";
	}, [status.level]);

	const connectionClassName = isConnected ? "text-green-400" : "text-red-400";

	async function fetchStatus() {
		try {
			const response = await fetch(`${API_BASE_URL}/status_view`, {
				cache: "no-store",
			});

			if (!response.ok) {
				throw new Error("Falha ao buscar status");
			}

			const data = await response.json();

			setStatus((current) => ({
				level: data.level ?? current.level,
				max_confidence: data.max_confidence ?? current.max_confidence,
				detections: data.detections ?? current.detections,
				alert: data.alert ?? current.alert,
				logs: Array.isArray(data.logs) ? data.logs : current.logs,
			}));

			setIsConnected(true);
		} catch (error) {
			console.error("Erro ao atualizar status:", error);

			setStatus((current) => ({
				...current,
				level: "ERROR",
				alert: "Conexão perdida com o servidor",
			}));

			setIsConnected(false);
		}
	}

	useEffect(() => {
		fetchStatus();

		const statusIntervalId = window.setInterval(fetchStatus, 1500);

		const timeIntervalId = window.setInterval(() => {
			setCurrentTime(getFormattedTime());
			setCurrentDate(getFormattedDate());
		}, 1000);

		return () => {
			window.clearInterval(statusIntervalId);
			window.clearInterval(timeIntervalId);
		};
	}, []);

	return (
		<div className="min-h-screen bg-black text-white">
			<style jsx global>{`
				@keyframes livePulse {
					0%,
					100% {
						opacity: 1;
						transform: scale(1);
					}

					50% {
						opacity: 0.5;
						transform: scale(0.8);
					}
				}
			`}</style>

			<Sidebar />

			<div className="min-h-screen lg:pl-[280px]">
				<Topbar />

				<main className="mx-auto max-w-[1600px] p-4 lg:p-6">
					<section className="mb-6 flex flex-col gap-6 rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md xl:flex-row xl:items-center xl:justify-between">
						<div>
							<h1 className="m-0 text-2xl font-bold text-slate-200 md:text-3xl">
								Dashboard de Monitoramento
							</h1>

							<p className="mt-1 text-sm text-white/60">
								Visão em tempo real das câmeras e detecções
							</p>
						</div>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-3 xl:flex xl:gap-8">
							<div className="flex items-center gap-3">
								<i className="pi pi-video text-2xl text-sky-400" />
								<div>
									<span className="block text-xs uppercase tracking-wider text-white/50">
										Câmeras Ativas
									</span>
									<span className="block text-lg font-bold text-white">1</span>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<i className={`pi pi-check-circle text-2xl ${connectionClassName}`} />
								<div>
									<span className="block text-xs uppercase tracking-wider text-white/50">
										Status
									</span>
									<span className="block text-lg font-bold text-white">
										{isConnected ? "Online" : "Offline"}
									</span>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<i className="pi pi-clock text-2xl text-sky-400" />
								<div>
									<span className="block text-xs uppercase tracking-wider text-white/50">
										Uptime
									</span>
									<span className="block text-lg font-bold text-white">{uptime}</span>
								</div>
							</div>
						</div>
					</section>

					<section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_380px]">
						<div className="flex flex-col gap-6">
							<div className="overflow-hidden rounded-xl border border-white/10 bg-black/80">
								<div className="flex flex-col gap-4 border-b border-white/10 bg-black/60 p-4 sm:flex-row sm:items-center sm:justify-between">
									<div className="flex items-center gap-3">
										<i className="pi pi-video text-xl text-sky-400" />
										<h2 className="m-0 text-base font-semibold text-white">
											Câmera 01 - Pátio Principal
										</h2>
									</div>

									<div className="flex gap-3">
										<div className="flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-500">
											<span className="h-2 w-2 rounded-full bg-red-500 [animation:livePulse_1.5s_infinite]" />
											LIVE
										</div>

										<div
											className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
												isRecording
													? "border-red-500/30 bg-red-500/15 text-red-500"
													: "border-gray-500/30 bg-gray-500/15 text-gray-500"
											}`}
										>
											<span className="h-2 w-2 rounded-full bg-current" />
											REC
										</div>
									</div>
								</div>

								<div className="relative aspect-video bg-black">
									<img
										src={videoFeedUrl}
										alt="Video Feed"
										className="h-full w-full object-contain"
									/>

									<div className="absolute left-4 top-4 flex flex-col gap-2">
										<div className="flex items-center gap-2 rounded-md border border-white/10 bg-black/70 px-3 py-2 font-mono text-sm text-white backdrop-blur-md">
											<i className="pi pi-calendar text-sky-400" />
											{currentDate}
										</div>

										<div className="flex items-center gap-2 rounded-md border border-white/10 bg-black/70 px-3 py-2 font-mono text-sm text-white backdrop-blur-md">
											<i className="pi pi-clock text-sky-400" />
											{currentTime}
										</div>
									</div>
								</div>

								<div className="flex flex-col gap-4 border-t border-white/10 bg-black/60 p-4 sm:flex-row sm:items-center sm:justify-between">
									<div className="flex justify-center gap-2">
										<Button icon="pi pi-play" text rounded size="small" />
										<Button icon="pi pi-pause" text rounded size="small" />
										<Button icon="pi pi-download" text rounded size="small" />
									</div>

									<div className="flex justify-center gap-2">
										<Button icon="pi pi-camera" text rounded size="small" />
										<Button icon="pi pi-cog" text rounded size="small" />
										<Button icon="pi pi-arrows-alt" text rounded size="small" />
									</div>
								</div>
							</div>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
								<div className="rounded-xl border border-white/10 bg-black/40 p-5 backdrop-blur-md">
									<div className="flex items-center gap-4">
										<i className="pi pi-shield-check text-3xl text-sky-400" />

										<div>
											<p className="mb-2 mt-0 text-xs uppercase tracking-wider text-white/50">
												Nível de Severidade
											</p>

											<Tag
												severity={getSeverityTag(status.level)}
												value={status.level || "NONE"}
											/>
										</div>
									</div>
								</div>

								<div className="rounded-xl border border-white/10 bg-black/40 p-5 backdrop-blur-md">
									<div className="flex items-center gap-4">
										<i className="pi pi-percentage text-3xl text-sky-400" />

										<div>
											<p className="mb-2 mt-0 text-xs uppercase tracking-wider text-white/50">
												Confiança Máxima
											</p>

											<p className="m-0 text-2xl font-bold text-white">
												{(status.max_confidence * 100).toFixed(1)}%
											</p>
										</div>
									</div>
								</div>

								<div className="rounded-xl border border-white/10 bg-black/40 p-5 backdrop-blur-md">
									<div className="flex items-center gap-4">
										<i className="pi pi-eye text-3xl text-sky-400" />

										<div>
											<p className="mb-2 mt-0 text-xs uppercase tracking-wider text-white/50">
												Total de Detecções
											</p>

											<p className="m-0 text-2xl font-bold text-white">
												{status.detections}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<aside className="grid grid-cols-1 gap-6 xl:flex xl:flex-col">
							{status.alert ? (
								<div className="rounded-xl border border-yellow-400/30 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 p-5 backdrop-blur-md">
									<div className="flex flex-col gap-3">
										<div className="flex items-center gap-3">
											<i className="pi pi-exclamation-triangle text-2xl text-yellow-400" />
											<h3 className="m-0 text-base font-bold text-yellow-300">
												Alerta Ativo
											</h3>
										</div>

										<p className="m-0 text-sm leading-6 text-yellow-100/90">
											{status.alert}
										</p>

										<div className="font-mono text-xs text-yellow-100/60">
											{currentTime}
										</div>
									</div>
								</div>
							) : null}

							<div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
								<div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
									<div className="flex items-center gap-3">
										<i className="pi pi-list text-sky-400" />
										<h3 className="m-0 text-sm font-semibold text-white">
											Logs de Atividade
										</h3>
									</div>

									<Button
										icon="pi pi-refresh"
										text
										rounded
										size="small"
										onClick={fetchStatus}
									/>
								</div>

								<div className="h-[320px] overflow-y-auto p-5">
									{status.logs.length ? (
										<div className="flex flex-col gap-3">
											{status.logs
												.slice()
												.reverse()
												.map((log, index) => (
													<div
														key={`${log}-${index}`}
														className="flex items-start gap-3 rounded-md border border-white/5 bg-black/20 p-3 transition hover:border-sky-400/20 hover:bg-black/30"
													>
														<i className="pi pi-circle-fill mt-1.5 text-[0.375rem] text-sky-400" />
														<span className="break-words font-mono text-[0.8125rem] leading-6 text-white/70">
															{log}
														</span>
													</div>
												))}
										</div>
									) : (
										<div className="flex h-full flex-col items-center justify-center gap-3">
											<i className="pi pi-inbox text-4xl text-white/20" />
											<p className="m-0 text-sm text-white/40">
												Nenhum log recente
											</p>
										</div>
									)}
								</div>
							</div>

							<div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
								<div className="border-b border-white/5 px-5 py-4">
									<div className="flex items-center gap-3">
										<i className="pi pi-server text-sky-400" />
										<h3 className="m-0 text-sm font-semibold text-white">
											Status do Sistema
										</h3>
									</div>
								</div>

								<div className="flex flex-col gap-4 p-5">
									<div className="flex items-center justify-between rounded-md border border-white/5 bg-black/20 p-3">
										<span className="flex items-center gap-2 text-sm text-white/70">
											<i className="pi pi-bolt text-sky-400" />
											CPU
										</span>
										<span className="text-sm font-semibold text-white">32%</span>
									</div>

									<div className="flex items-center justify-between rounded-md border border-white/5 bg-black/20 p-3">
										<span className="flex items-center gap-2 text-sm text-white/70">
											<i className="pi pi-database text-sky-400" />
											Memória
										</span>
										<span className="text-sm font-semibold text-white">
											1.2 GB
										</span>
									</div>

									<div className="flex items-center justify-between rounded-md border border-white/5 bg-black/20 p-3">
										<span className="flex items-center gap-2 text-sm text-white/70">
											<i className="pi pi-wifi text-sky-400" />
											Latência
										</span>
										<span className="text-sm font-semibold text-white">45ms</span>
									</div>
								</div>
							</div>
						</aside>
					</section>
				</main>
			</div>
		</div>
	);
}