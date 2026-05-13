"use client";

import React, { useEffect, useMemo, useState } from "react";

import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

import { monitoringService } from "../../features/monitoring/services/monitoring.service";
import type {
	DashboardStatus,
	StatusLevel,
} from "../../features/monitoring/types/monitoring.types";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

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

export default function DashboardPage() {
	const videoFeedUrl = monitoringService.getVideoFeedUrl();

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
			const data = await monitoringService.getStatusView();

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