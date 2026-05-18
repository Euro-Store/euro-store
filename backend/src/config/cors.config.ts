const DEV_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
];

function getAllowedOrigins(): string[] {
  const env = process.env.CORS_ORIGINS;
  if (!env) {
    if (process.env.NODE_ENV === "production") {
      console.warn("[CORS] WARNING: CORS_ORIGINS is not set in production!");
    }
    return DEV_ORIGINS;
  }
  return env.split(",").map((o) => o.trim()).filter(Boolean);
}

export const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin) return callback(null, true);
    if (getAllowedOrigins().includes(origin)) return callback(null, true);
    console.warn(`[CORS] Blocked: ${origin}`);
    return callback(new Error(`CORS: origin "${origin}" not allowed`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["X-Total-Count", "X-Page", "X-Per-Page"],
  maxAge: 86400,
};
