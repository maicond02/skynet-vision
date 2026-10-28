"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

import Sidebar from "../Dashboard/Sidebar";
import Topbar from "../Dashboard/Topbar";
import { monitoringService } from "../../features/monitoring/services/monitoring.service";
import type {
  IncidentsResponse,
  StatusLevel,
} from "../../features/monitoring/types/monitoring.types";

type Incident = IncidentsResponse["incidents"][number];
type Period = "7" | "30" | "90" | "all";

const periods: { value: Period; label: string }[] = [
  { value: "7", label: "7 dias" },
  { value: "30", label: "30 dias" },
  { value: "90", label: "90 dias" },
  { value: "all", label: "Todo o período" },
];

const severityLabels: Record<string, string> = {
  HIGH: "Alta",
  MILD: "Moderada",
  NONE: "Sem risco",
  ERROR: "Erro",
};

function parseIncidentDate(value: string): Date | null {
  const match = value.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:T.*)?$|^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return null;

  const year = Number(match[1] ?? match[6]);
  const month = Number(match[2] ?? match[5]);
  const day = Number(match[3] ?? match[4]);
  const date = new Date(year, month - 1, day);

  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
    ? date
    : null;
}

function getConfidencePercentage(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, value <= 1 ? value * 100 : value));
}

function getSeverityTag(level: StatusLevel): "danger" | "warning" | "success" | "info" {
  if (level === "HIGH" || level === "ERROR") return "danger";
  if (level === "MILD") return "warning";
  if (level === "NONE") return "success";
  return "info";
}

function formatCsvCell(value: string | number): string {
  const text = String(value);
  const safeText = /^[\s]*[=+\-@]/.test(text) ? `'${text}` : text;
  return `"${safeText.replaceAll('"', '""')}"`;
}

export default function ReportsMain() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [period, setPeriod] = useState<Period>("30");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    let active = true;

    monitoringService.getIncidents()
      .then((data) => {
        if (!active) return;
        setIncidents(Array.isArray(data.incidents) ? data.incidents : []);
        setLastUpdated(new Date());
        setToday(new Date());
      })
      .catch(() => {
        if (active) setError("Não foi possível carregar os incidentes. Tente atualizar o relatório.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, []);

  async function refreshReport() {
    setLoading(true);
    setError(null);

    try {
      const data = await monitoringService.getIncidents();
      setIncidents(Array.isArray(data.incidents) ? data.incidents : []);
      setLastUpdated(new Date());
      setToday(new Date());
    } catch {
      setError("Não foi possível atualizar os incidentes. Os dados anteriores foram mantidos.");
    } finally {
      setLoading(false);
    }
  }

  const filteredIncidents = useMemo(() => {
    if (period === "all" || !today) return incidents;

    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    start.setDate(start.getDate() - Number(period) + 1);

    return incidents.filter((incident) => {
      const date = parseIncidentDate(incident.date);
      return date !== null && date >= start && date <= today;
    });
  }, [incidents, period, today]);

  const summary = useMemo(() => {
    const detections = filteredIncidents.reduce(
      (total, incident) => total + (Number.isFinite(incident.detections) ? incident.detections : 0),
      0,
    );
    const averageConfidence = filteredIncidents.length
      ? filteredIncidents.reduce((total, incident) => total + getConfidencePercentage(incident.confidence), 0) / filteredIncidents.length
      : 0;
    const high = filteredIncidents.filter((incident) => incident.severity === "HIGH").length;

    return { detections, averageConfidence, high };
  }, [filteredIncidents]);

  const severityCounts = useMemo(() => {
    const counts = new Map<string, number>();
    filteredIncidents.forEach((incident) => {
      counts.set(incident.severity, (counts.get(incident.severity) ?? 0) + 1);
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [filteredIncidents]);

  const recentDays = useMemo(() => {
    if (!today) return [];
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      date.setDate(date.getDate() - 6 + index);
      const count = filteredIncidents.filter((incident) => {
        const incidentDate = parseIncidentDate(incident.date);
        return incidentDate?.getTime() === date.getTime();
      }).length;
      return { label: date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }), count };
    });
  }, [filteredIncidents, today]);

  const sortedIncidents = useMemo(() => [...filteredIncidents].sort((a, b) => {
    const first = parseIncidentDate(a.date)?.getTime() ?? 0;
    const second = parseIncidentDate(b.date)?.getTime() ?? 0;
    if (second !== first) return second - first;
    return b.time.localeCompare(a.time);
  }), [filteredIncidents]);

  function exportCsv() {
    const rows = [
      ["Data", "Hora", "Severidade", "Confiança (%)", "Detecções", "Descrição"],
      ...sortedIncidents.map((incident) => [
        incident.date,
        incident.time,
        severityLabels[incident.severity] ?? incident.severity,
        getConfidencePercentage(incident.confidence).toFixed(1),
        incident.detections,
        incident.message,
      ]),
    ];
    const csv = "\uFEFF" + rows.map((row) => row.map(formatCsvCell).join(";")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    const date = new Date();
    const dateStamp = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    link.download = `relatorio-incidentes-${dateStamp}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }

  const maxDailyCount = Math.max(1, ...recentDays.map((day) => day.count));
  const hasLoadedData = lastUpdated !== null;

  return (
    <div className="dashboard-page min-h-screen bg-black text-white">
      <Sidebar />
      <div className="dashboard-content min-h-screen lg:pl-[280px]">
        <Topbar />
        <main className="mx-auto max-w-[1600px] space-y-6 p-4 lg:p-6">
          <section className="flex flex-col gap-5 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">Análise operacional</p>
              <h1 className="m-0 text-2xl font-bold text-slate-200 md:text-3xl">Relatórios</h1>
              <p className="mt-2 text-sm text-white/60">Resumo dos incidentes registrados pelo monitoramento.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 max-[380px]:[&>.p-button]:w-full">
              <Button icon="pi pi-refresh" label="Atualizar" outlined onClick={refreshReport} disabled={loading} />
              <Button icon="pi pi-download" label="Exportar CSV" onClick={exportCsv} disabled={loading || sortedIncidents.length === 0} />
            </div>
          </section>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Período do relatório">
              {periods.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPeriod(option.value)}
                  aria-pressed={period === option.value}
                  className={`reports-period rounded-full border px-4 py-2 text-sm transition-colors ${period === option.value
                    ? "border-sky-400/50 bg-sky-400/15 font-semibold text-sky-300"
                    : "border-white/10 bg-white/[0.03] text-white/60 hover:border-sky-400/30 hover:text-white"}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="m-0 text-xs text-white/50">
              {lastUpdated ? `Atualizado em ${lastUpdated.toLocaleString("pt-BR")}` : "Aguardando dados"}
            </p>
          </div>

          {error && <div role="alert" className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Incidentes", value: filteredIncidents.length.toLocaleString("pt-BR"), icon: "pi pi-exclamation-triangle" },
              { label: "Alta severidade", value: summary.high.toLocaleString("pt-BR"), icon: "pi pi-bolt" },
              { label: "Detecções", value: summary.detections.toLocaleString("pt-BR"), icon: "pi pi-eye" },
              { label: "Confiança média", value: `${summary.averageConfidence.toFixed(1)}%`, icon: "pi pi-percentage" },
            ].map((metric) => (
              <section key={metric.label} className="rounded-xl border border-white/10 bg-black/40 p-5 backdrop-blur-md">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-400/10 text-sky-400">
                  <i className={metric.icon} aria-hidden="true" />
                </div>
                <p className="m-0 text-xs uppercase tracking-wider text-white/50">{metric.label}</p>
                <p className="mb-0 mt-2 text-2xl font-bold text-white">{hasLoadedData ? metric.value : "—"}</p>
              </section>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,1fr)]">
            <section className="min-w-0 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md sm:p-6">
              <h2 className="m-0 text-base font-semibold text-white">Atividade nos últimos 7 dias</h2>
              <p className="mt-1 text-xs text-white/50">Incidentes por data, dentro do período selecionado.</p>
              <div className="mt-8 flex h-48 items-end gap-1 sm:gap-3" aria-label="Incidentes por dia">
                {recentDays.map((day) => (
                  <div key={day.label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                    <span className="text-xs font-semibold text-white/70">{day.count}</span>
                    <div className="reports-chart-track flex h-32 w-full items-end rounded-t-lg bg-white/[0.03]">
                      <div className="w-full rounded-t-lg bg-sky-500/80" style={{ height: `${(day.count / maxDailyCount) * 100}%` }} />
                    </div>
                    <span className="text-[11px] text-white/50">{day.label}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="min-w-0 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md sm:p-6">
              <h2 className="m-0 text-base font-semibold text-white">Por severidade</h2>
              <p className="mt-1 text-xs text-white/50">Distribuição no período selecionado.</p>
              {severityCounts.length ? (
                <div className="mt-8 space-y-5">
                  {severityCounts.map(([level, count]) => (
                    <div key={level}>
                      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                        <span className="text-white/70">{severityLabels[level] ?? level}</span>
                        <span className="font-semibold text-white">{count}</span>
                      </div>
                      <div className="reports-severity-track h-2 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-sky-500" style={{ width: `${(count / filteredIncidents.length) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-8 text-sm text-white/50">{hasLoadedData ? "Nenhum incidente para distribuir." : "Dados indisponíveis."}</p>
              )}
            </section>
          </div>

          <section className="overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-4 sm:p-6">
              <div>
                <h2 className="m-0 text-base font-semibold text-white">Registro de incidentes</h2>
                <p className="mb-0 mt-1 text-xs text-white/50">{hasLoadedData ? `${sortedIncidents.length} registro(s) no período` : "Registros indisponíveis"}</p>
              </div>
            </div>
            {loading && !hasLoadedData ? (
              <p className="p-8 text-center text-sm text-white/60">Carregando relatório...</p>
            ) : !hasLoadedData ? (
              <p className="p-8 text-center text-sm text-white/60">Dados indisponíveis. Atualize para tentar novamente.</p>
            ) : !sortedIncidents.length ? (
              <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
                <i className="pi pi-inbox text-3xl text-white/30" aria-hidden="true" />
                <p className="m-0 text-sm text-white/60">Nenhum incidente encontrado para este período.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-[760px] w-full text-left text-sm">
                  <thead className="border-b border-white/10 bg-white/[0.035] text-xs uppercase tracking-wider text-white/50">
                    <tr>
                      <th className="px-5 py-4 font-semibold">Data e hora</th>
                      <th className="px-5 py-4 font-semibold">Severidade</th>
                      <th className="px-5 py-4 font-semibold">Confiança</th>
                      <th className="px-5 py-4 font-semibold">Detecções</th>
                      <th className="px-5 py-4 font-semibold">Descrição</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {sortedIncidents.map((incident, index) => (
                      <tr key={`${incident.date}-${incident.time}-${index}`} className="hover:bg-white/[0.035]">
                        <td className="whitespace-nowrap px-5 py-4 text-white/70">{incident.date} · {incident.time}</td>
                        <td className="px-5 py-4"><Tag value={severityLabels[incident.severity] ?? incident.severity} severity={getSeverityTag(incident.severity)} /></td>
                        <td className="px-5 py-4 text-white/70">{getConfidencePercentage(incident.confidence).toFixed(1)}%</td>
                        <td className="px-5 py-4 text-white/70">{incident.detections}</td>
                        <td className="max-w-md px-5 py-4 text-white/70">{incident.message || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
