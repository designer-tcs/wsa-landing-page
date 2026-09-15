import "dotenv/config";
import cors from "cors";
import express from "express";
import { debugCrmConfig, isCrmDebugEnabled } from "./crm-debug.js";
import leadsRouter from "./routes/leads.js";

const app = express();
const port = Number(process.env.PORT) || 3001;
const frontendOrigin =
  process.env.FRONTEND_ORIGIN ||
  "http://localhost:8080,https://wellspringsacademy.in,https://www.wellspringsacademy.in";

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? frontendOrigin.split(",").map((o) => o.trim())
        : true,
    methods: ["GET", "POST", "OPTIONS"],
  }),
);
app.use(express.json({ limit: "32kb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/leads", leadsRouter);

app.listen(port, () => {
  console.info(`Wellsprings backend listening on http://localhost:${port}`);
  if (isCrmDebugEnabled()) console.info("[CRM DEBUG] Logging enabled — set CRM_DEBUG=true in backend/.env");
  debugCrmConfig(process.env.CRM_API_URL?.trim() || "");
});
