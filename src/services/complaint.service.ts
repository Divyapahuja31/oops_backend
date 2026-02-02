import { ComplaintRepository } from "../repositories/complaint.repository";
import { ComplaintModel } from "../models/complaint.model";
import { AppError } from "../utils/AppError";
import { ComplaintStatus } from "../utils/complaint.enums";
import { ComplaintQueryOptions } from "../utils/complaint.interface";

export class ComplaintService {
    private complaintRepository: ComplaintRepository;

    constructor() {
        this.complaintRepository = new ComplaintRepository();
    }

    createComplaint(title: string, description: string): ComplaintModel {
        if (!title || !description) {
            throw new AppError("Title and description are required", 400);
        }

        const result = this.complaintRepository.findAll({});
        const allComplaints = result.data;

        const maxId = allComplaints.reduce((max, c) => (c.id > max ? c.id : max), 0);
        const newId = maxId + 1;

        const newComplaint = new ComplaintModel(newId, title, description);
        return this.complaintRepository.create(newComplaint);
    }

    getAllComplaints(options: ComplaintQueryOptions): { data: ComplaintModel[]; total: number, page: number, limit: number } {
        const result = this.complaintRepository.findAll(options);
        return {
            data: result.data,
            total: result.total,
            page: options.page || 1,
            limit: options.limit || result.total
        };
    }

    getComplaintById(id: number): ComplaintModel {
        const complaint = this.complaintRepository.findById(id);
        if (!complaint) {
            throw new AppError("Complaint not found", 404);
        }
        return complaint;
    }

    updateComplaint(id: number, title?: string, description?: string): ComplaintModel {
        const complaint = this.getComplaintById(id);
        const updates: Partial<ComplaintModel> = {};
        if (title) updates.title = title;
        if (description) updates.description = description;

        const updated = this.complaintRepository.update(id, updates);
        if (!updated) throw new AppError("Complaint not found", 404);

        return updated;
    }

    deleteComplaint(id: number): void {
        const deleted = this.complaintRepository.delete(id);
        if (!deleted) {
            throw new AppError("Complaint not found", 404);
        }
    }

    resolveComplaint(id: number): ComplaintModel {
        const complaint = this.getComplaintById(id);
        complaint.resolve();
        return complaint;
    }
}
