"use client";

import React, { useEffect, useMemo, useState } from "react";

import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

import { monitoringService } from "../../features/monitoring/services/monitoring.service";
import type {
	IncidentsResponse,
	StatusLevel,
} from "../../features/monitoring/types/monitoring.types";

import Sidebar from "../Dashboard/Sidebar";
import Topbar from "../Dashboard/Topbar";

type Incident = IncidentsResponse["incidents"][number];

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

function formatConfidence(confidence: number) {
	const value = Number.isFinite(confidence) ? confidence : 0;
	const normalized = value <= 1 ? value * 100 : value;
	return `${normalized.toFixed(1)}%`;
}

export default function IncidentsPage() {
	const [incidents, setIncidents] = useState<Incident[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	async function fetchIncidents() {
		setLoading(true);
		setError(null);

		try {
			const data = await monitoringService.getIncidents();
			setIncidents(Array.isArray(data.incidents) ? data.incidents : []);
		} catch (err) {
			console.error("Erro ao buscar incidentes:", err);
			setError("Falha ao buscar incidentes");
			setIncidents([]);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchIncidents();
	}, []);

	const reversedIncidents = useMemo(() => {
		return incidents.slice().reverse();
	}, [incidents]);

	return (
		<div className="min-h-screen bg-black text-white">
			<Sidebar />

			<div className="min-h-screen lg:pl-[280px]">
				<Topbar />

				<main className="mx-auto max-w-[1600px] p-4 lg:p-6">
					<section className="mb-6 flex flex-col gap-4 rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
						<div>
							<h1 className="m-0 text-2xl font-bold text-slate-200 md:text-3xl">
								Incidentes
							</h1>
							<p className="mt-1 text-sm text-white/60">
								Histórico de alertas e eventos detectados.
							</p>
						</div>

						<Button
							icon="pi pi-refresh"
							label="Atualizar"
							outlined
							onClick={fetchIncidents}
							disabled={loading}
						/>
					</section>

					<section className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
						<div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
							<div className="flex items-center gap-3">
								<i className="pi pi-exclamation-triangle text-sky-400" />
								<h2 className="m-0 text-sm font-semibold text-white">
									Lista de Incidentes
								</h2>
							</div>
							<div className="text-xs text-white/60">
								{loading
									? "Carregando..."
									: `${reversedIncidents.length} item(ns)`}
							</div>
						</div>

						<div className="p-6">
							{error ? (
								<div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
									{error}
								</div>
							) : null}

							{!error && !loading && reversedIncidents.length === 0 ? (
								<div className="flex flex-col items-center justify-center gap-3 py-14">
									<i className="pi pi-inbox text-4xl text-white/20" />
									<p className="m-0 text-sm text-white/40">
										Nenhum incidente registrado
									</p>
								</div>
							) : null}

							{reversedIncidents.length ? (
								<div className="flex flex-col gap-3">
									{reversedIncidents.map((incident, index) => (
										<div
											key={`${incident.date}-${incident.time}-${index}`}
											className="rounded-lg border border-white/10 bg-black/20 p-4 transition hover:border-sky-400/20 hover:bg-black/30"
										>
											<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
												<div className="flex flex-wrap items-center gap-3">
													<div className="flex items-center gap-2 font-mono text-xs text-white/70">
														<i className="pi pi-calendar text-sky-400" />
														<span>{incident.date}</span>
													</div>
													<div className="flex items-center gap-2 font-mono text-xs text-white/70">
														<i className="pi pi-clock text-sky-400" />
														<span>{incident.time}</span>
													</div>
													<Tag
														severity={getSeverityTag(incident.severity)}
														value={incident.severity}
													/>
												</div>

												<div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
													<div className="flex items-center gap-2">
														<i className="pi pi-percentage text-sky-400" />
														<span>{formatConfidence(incident.confidence)}</span>
													</div>
													<div className="flex items-center gap-2">
														<i className="pi pi-eye text-sky-400" />
														<span>{incident.detections} detecção(ões)</span>
													</div>
												</div>
											</div>

											{incident.message ? (
												<p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-white/70">
													{incident.message}
												</p>
											) : null}
										</div>
									))}
								</div>
							) : null}
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}

