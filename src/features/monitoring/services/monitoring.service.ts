import type {
  DashboardStatus,
  IncidentsResponse,
  MonitoringSettings,
} from "../types/monitoring.types";

const API_PROXY_BASE = "/api/monitoring";

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    cache: "no-store",
    ...init,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${response.statusText}`);
  }

  return (await response.json()) as T;
}

export const monitoringService = {
  getVideoFeedUrl(): string {
    return `${API_PROXY_BASE}/video_feed`;
  },

  async getStatusView(): Promise<DashboardStatus> {
    return fetchJson<DashboardStatus>(`${API_PROXY_BASE}/status_view`);
  },

  async getIncidents(): Promise<IncidentsResponse> {
    return fetchJson<IncidentsResponse>(`${API_PROXY_BASE}/incidents`);
  },

  async getSettings(): Promise<MonitoringSettings> {
    return fetchJson<MonitoringSettings>(`${API_PROXY_BASE}/settings`);
  },

  async updateSettings(input: {
    telegram_alert_interval: number;
    emergency_call_interval: number;
    video_save_path: string;
  }): Promise<{ success: boolean; settings: MonitoringSettings }> {
    const form = new FormData();
    form.set("telegram_alert_interval", String(input.telegram_alert_interval));
    form.set("emergency_call_interval", String(input.emergency_call_interval));
    form.set("video_save_path", input.video_save_path);

    return fetchJson<{ success: boolean; settings: MonitoringSettings }>(
      `${API_PROXY_BASE}/update_settings`,
      {
        method: "POST",
        body: form,
      },
    );
  },
};
