import { Request, Response } from "express";
import { complaints } from "../utils/data.store";
import { ComplaintModel } from "../models/complaint.model";
import { AppError } from "../utils/AppError";

export class ComplaintController {
  createComplaint(req: Request, res: Response) {
    const { title, description } = req.body;

    if (!title || !description) {
      throw new AppError("Title and description are required", 400);
    }

    const complaint = new ComplaintModel(
      complaints.length + 1,
      title,
      description
    );

    complaints.push(complaint);

    return res.status(201).json(complaint);
  }

  getAllComplaints(req: Request, res: Response) {
    return res.status(200).json(complaints);
  }

  resolveComplaint(req: Request, res: Response) {
    const id = Number(req.params.id);
    const complaint = complaints.find(c => c.id === id);

    if (!complaint) {
      throw new AppError("Complaint not found", 404);
    }

    complaint.resolve();
    return res.status(200).json(complaint);
  }
}
