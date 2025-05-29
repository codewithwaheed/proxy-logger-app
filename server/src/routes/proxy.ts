import { Router } from "express";
import { createCustomProxy } from "../middleware/proxy";
import { logRequest } from "../middleware/logRequest";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use("/users", authenticate, logRequest, createCustomProxy("users", "https://jsonplaceholder.typicode.com/users"));
router.use((req, res, next) => {
    console.log("Proxying:", req.originalUrl);
    next();
  });

export default router;