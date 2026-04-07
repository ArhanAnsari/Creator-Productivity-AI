export const Colors = {
  light: {
    text: "#000",
    background: "#fff",
    backgroundSecondary: "#f8f9fa",
    tint: "#6366f1",
    tabIconDefault: "#ccc",
    tabIconSelected: "#6366f1",
    border: "#e5e7eb",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    card: "#ffffff",
  },
  dark: {
    text: "#fff",
    background: "#0f172a",
    backgroundSecondary: "#1e293b",
    tint: "#818cf8",
    tabIconDefault: "#666",
    tabIconSelected: "#818cf8",
    border: "#334155",
    success: "#34d399",
    warning: "#fbbf24",
    error: "#f87171",
    card: "#1e293b",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: "bold" as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: "bold" as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: "bold" as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 14,
    fontWeight: "normal" as const,
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: "normal" as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 14,
    fontWeight: "600" as const,
    lineHeight: 20,
  },
};
