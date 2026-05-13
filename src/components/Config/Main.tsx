"use client";

import React, { useEffect, useMemo, useState } from "react";

import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

import { monitoringService } from "../../features/monitoring/services/monitoring.service";
import type { MonitoringSettings } from "../../features/monitoring/types/monitoring.types";

import Sidebar from "../Dashboard/Sidebar";
import Topbar from "../Dashboard/Topbar";

function clampMinInt(value: number | null | undefined, min: number) {
	if (value == null || Number.isNaN(value)) return min;
	return Math.max(min, Math.floor(value));
}

export default function ConfigPage() {
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const [videoSavePath, setVideoSavePath] = useState<string>("output");
	const [telegramInterval, setTelegramInterval] = useState<number | null>(10);
	const [emergencyInterval, setEmergencyInterval] = useState<number | null>(30);

	async function fetchSettings() {
		setLoading(true);
		setError(null);
		setSuccessMessage(null);

		try {
			const settings = await monitoringService.getSettings();
			setVideoSavePath(settings.video_save_path ?? "output");
			setTelegramInterval(settings.telegram_alert_interval ?? 10);
			setEmergencyInterval(settings.emergency_call_interval ?? 30);
		} catch (err) {
			console.error("Erro ao buscar settings:", err);
			setError("Falha ao carregar configurações");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchSettings();
	}, []);

	const canSave = useMemo(() => {
		return !loading && !saving;
	}, [loading, saving]);

	async function handleSave() {
		setSaving(true);
		setError(null);
		setSuccessMessage(null);

		try {
			const payload: MonitoringSettings = {
				video_save_path: videoSavePath.trim() || "output",
				telegram_alert_interval: clampMinInt(telegramInterval, 1),
				emergency_call_interval: clampMinInt(emergencyInterval, 1),
			};

			const result = await monitoringService.updateSettings(payload);

			setVideoSavePath(result.settings.video_save_path ?? payload.video_save_path);
			setTelegramInterval(
				result.settings.telegram_alert_interval ?? payload.telegram_alert_interval,
			);
			setEmergencyInterval(
				result.settings.emergency_call_interval ?? payload.emergency_call_interval,
			);

			setSuccessMessage("Configurações salvas com sucesso");
		} catch (err) {
			console.error("Erro ao salvar settings:", err);
			setError("Falha ao salvar configurações");
		} finally {
			setSaving(false);
		}
	}

	return (
		<div className="min-h-screen bg-black text-white">
			<Sidebar />

			<div className="min-h-screen lg:pl-[280px]">
				<Topbar />

				<main className="mx-auto max-w-[1600px] p-4 lg:p-6">
					<section className="mb-6 flex flex-col gap-4 rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
						<div>
							<h1 className="m-0 text-2xl font-bold text-slate-200 md:text-3xl">
								Configurações
							</h1>
							<p className="mt-1 text-sm text-white/60">
								Ajuste intervalos e caminho de gravação.
							</p>
						</div>

						<div className="flex flex-wrap gap-2">
							<Button
								icon="pi pi-refresh"
								label="Recarregar"
								outlined
								onClick={fetchSettings}
								disabled={saving}
							/>
							<Button
								icon="pi pi-save"
								label={saving ? "Salvando..." : "Salvar"}
								onClick={handleSave}
								disabled={!canSave}
							/>
						</div>
					</section>

					<section className="rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
						{loading ? (
							<p className="m-0 text-sm text-white/60">Carregando...</p>
						) : (
							<div className="space-y-4">
								{error ? (
									<div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
										{error}
									</div>
								) : null}

								{successMessage ? (
									<div className="rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-200">
										{successMessage}
									</div>
								) : null}

								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<div className="space-y-2">
										<label className="text-xs text-white/70">
											Pasta para salvar vídeos
										</label>
										<InputText
											value={videoSavePath}
											onChange={(e) => setVideoSavePath(e.target.value)}
											className="w-full"
											placeholder="output"
										/>
										<p className="m-0 text-xs text-white/50">
											Ex.: <span className="font-mono">output</span> ou
												 <span className="font-mono">C:\\videos</span>
										</p>
									</div>

									<div className="space-y-2">
										<label className="text-xs text-white/70">
											Intervalo alerta Telegram (s)
										</label>
										<InputNumber
											value={telegramInterval}
											onValueChange={(e) => setTelegramInterval(e.value ?? null)}
											min={1}
											showButtons
											className="w-full"
											inputClassName="w-full"
										/>
										<p className="m-0 text-xs text-white/50">
											Mínimo: 1 segundo
										</p>
									</div>

									<div className="space-y-2">
										<label className="text-xs text-white/70">
											Intervalo chamada emergência (s)
										</label>
										<InputNumber
											value={emergencyInterval}
											onValueChange={(e) => setEmergencyInterval(e.value ?? null)}
											min={1}
											showButtons
											className="w-full"
											inputClassName="w-full"
										/>
										<p className="m-0 text-xs text-white/50">
											Mínimo: 1 segundo
										</p>
									</div>
								</div>
							</div>
						)}
					</section>
				</main>
			</div>
		</div>
	);
}

