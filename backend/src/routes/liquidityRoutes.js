import { Router } from "express";
import {
  executeAction,
  getConfiguration,
  getHealth,
  getState,
  streamUpdates,
  triggerSpikeEvent
} from "../controllers/liquidityController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/health", getHealth);

// Protect the rest of the endpoints
router.use(requireAuth);

router.get("/config", getConfiguration); 
router.get("/state", getState);
router.post("/events/spike", triggerSpikeEvent);
router.post("/actions/execute", executeAction);
router.get("/stream", streamUpdates);

export default router;
