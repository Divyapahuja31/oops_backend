import { Router } from "express";
import { ComplaintController } from "../controllers/complaint.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
const controller = new ComplaintController();

router.post("/complaints", authenticate, (req, res) => controller.createComplaint(req, res));
router.get("/complaints", authenticate, (req, res) => controller.getAllComplaints(req, res));
router.get("/complaints/:id", authenticate, (req, res) => controller.getComplaintById(req, res));

router.patch("/complaints/:id", authenticate, (req, res) => controller.updateComplaint(req, res));
router.patch("/complaints/:id/resolve", authenticate, (req, res) => controller.resolveComplaint(req, res));

router.delete("/complaints/:id", authenticate, (req, res) => controller.deleteComplaint(req, res));

export default router;
