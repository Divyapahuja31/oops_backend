import { ComplaintStatus } from "./complaint.enums";

export interface Complaint {
    id: number;
    title: string;
    description: string;
    status: ComplaintStatus;
}

export interface ComplaintQueryOptions {
    page?: number;
    limit?: number;
    search?: string;
    status?: ComplaintStatus;
    sortBy?: keyof Complaint;
    sortOrder?: 'asc' | 'desc';
}
