import express, { Request, Response } from "express";
import Log from "../models/Log";
import { authenticate } from "../middleware/auth";
import { loggingConfig } from "../utils/loggingConfig";

const router = express.Router();

interface WhitelistPayload {
  path: string;
  action: "add" | "remove";
}

router.get("/", authenticate, async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string | undefined;
    const query: Record<string, any> = {};

    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [
        { method: regex },
        { url: regex },
        { ip: regex },
        { status: !isNaN(Number(search)) ? Number(search) : -1 },
      ];
    }

    const logs = await Log.find(query)
      .populate("user", "name email")
      .sort({ timestamp: -1 })
      .lean();

    res.json({logs, loggingConfig});
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});
  
router.post("/toggle", (_req: Request, res: Response) => {
  loggingConfig.isEnabled = !loggingConfig.isEnabled;
  res.json({ isEnabled: loggingConfig.isEnabled });
});

router.post(
  "/whitelist",
  async (req: Request<{}, {}, WhitelistPayload>, res: Response): Promise<void> => {
    try {
      const { path, action } = req.body;

      if (!path || typeof path !== "string") {
        res.status(400).json({ error: "Missing or invalid 'path'" });
        return;
      }

      if (action === "add" && !loggingConfig.whitelist.includes(path)) {
        loggingConfig.whitelist.push(path);
      } else if (action === "remove") {
        loggingConfig.whitelist = loggingConfig.whitelist.filter((p) => p !== path);
      }

      res.json({ whitelist: loggingConfig.whitelist });
    } catch (error) {
      console.error("Error modifying whitelist:", error);
      res.status(500).json({ error: "Failed to modify whitelist" });
    }
  }
);

export default router;
