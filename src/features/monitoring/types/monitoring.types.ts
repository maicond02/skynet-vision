export type StatusLevel = "HIGH" | "MILD" | "NONE" | "ERROR" | (string & {});

export type DashboardStatus = {
  level: StatusLevel;
  max_confidence: number;
  detections: number;
  last_update?: string;
  alert: string;
  logs: string[];
};

export type MonitoringSettings = {
  video_save_path: string;
  telegram_alert_interval: number;
  emergency_call_interval: number;
};

export type IncidentsResponse = {
  incidents: Array<{
    date: string;
    time: string;
    severity: StatusLevel;
    confidence: number;
    detections: number;
    message: string;
  }>;
};
