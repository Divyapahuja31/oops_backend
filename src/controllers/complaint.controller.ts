import { Request, Response } from "express";
import { ComplaintService } from "../services/complaint.service";
import { ComplaintQueryOptions } from "../utils/complaint.interface";
import { ComplaintStatus } from "../utils/complaint.enums";

export class ComplaintController {
  private complaintService: ComplaintService;

  constructor() {
    this.complaintService = new ComplaintService();
  }

  createComplaint(req: Request, res: Response) {
    const { title, description } = req.body;
    const complaint = this.complaintService.createComplaint(title, description);
    return res.status(201).json(complaint);
  }

  getAllComplaints(req: Request, res: Response) {
    const page = req.query.page ? parseInt(req.query.page as string) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const search = req.query.search as string;
    const status = req.query.status as ComplaintStatus;
    const sortBy = req.query.sortBy as any;
    const sortOrder = req.query.sortOrder as 'asc' | 'desc';

    const options: ComplaintQueryOptions = {
      page,
      limit,
      search,
      status,
      sortBy,
      sortOrder
    };

    const result = this.complaintService.getAllComplaints(options);
    return res.status(200).json(result);
  }

  getComplaintById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const complaint = this.complaintService.getComplaintById(id);
    return res.status(200).json(complaint);
  }

  updateComplaint(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { title, description } = req.body;
    const complaint = this.complaintService.updateComplaint(id, title, description);
    return res.status(200).json(complaint);
  }

  deleteComplaint(req: Request, res: Response) {
    const id = Number(req.params.id);
    this.complaintService.deleteComplaint(id);
    return res.status(204).send();
  }

  resolveComplaint(req: Request, res: Response) {
    const id = Number(req.params.id);
    const complaint = this.complaintService.resolveComplaint(id);
    return res.status(200).json(complaint);
  }
}
