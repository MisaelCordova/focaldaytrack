export const lightTheme = {
  colors: {
    pageBackground: "#ffffff",
    surface: "#ffffff",
    surfaceMuted: "#f6fafd",
    boardBackground: "#f0f8ff",
    textPrimary: "#111827",
    textSecondary: "#475569",
    textMuted: "#858b96",
    border: "#e2e8f0",
    borderAccent: "#8da9f0",
    primary: "#3665e4",
    danger: "#dc2626",
    dangerText: "#ef4444",
    shadow: "rgba(226, 232, 240, 0.9)",
    overlay: "rgba(17, 24, 39, 0.45)",
  },
};

export const darkTheme = {
  colors: {
    pageBackground: "#0f172a",
    surface: "#1e293b",
    surfaceMuted: "#172033",
    boardBackground: "#111827",
    textPrimary: "#f8fafc",
    textSecondary: "#cbd5e1",
    textMuted: "#94a3b8",
    border: "#334155",
    borderAccent: "#5b7bd5",
    primary: "#5b7cfa",
    danger: "#ef4444",
    dangerText: "#f87171",
    shadow: "rgba(2, 6, 23, 0.35)",
    overlay: "rgba(2, 6, 23, 0.72)",
  },
};

export type AppTheme = typeof lightTheme;
