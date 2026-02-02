import { Router } from "express";
import { ComplaintController } from "../controllers/complaint.controller";

const router = Router();
const controller = new ComplaintController();

router.post("/complaints", (req, res) =>
  controller.createComplaint(req, res)
);

router.get("/complaints", (req, res) =>
  controller.getAllComplaints(req, res)
);

router.patch("/complaints/:id/resolve", (req, res) =>
  controller.resolveComplaint(req, res)
);

export default router;
