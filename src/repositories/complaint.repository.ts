import { ComplaintModel } from "../models/complaint.model";
import { complaints } from "../utils/data.store";
import { ComplaintQueryOptions } from "../utils/complaint.interface";

export class ComplaintRepository {
    create(complaint: ComplaintModel): ComplaintModel {
        complaints.push(complaint);
        return complaint;
    }

    findAll(options: ComplaintQueryOptions): { data: ComplaintModel[]; total: number } {
        let result = [...complaints];

        if (options.search) {
            const searchLower = options.search.toLowerCase();
            result = result.filter(
                (c) =>
                    c.title.toLowerCase().includes(searchLower) ||
                    c.description.toLowerCase().includes(searchLower)
            );
        }

        if (options.status) {
            result = result.filter((c) => c.status === options.status);
        }

        if (options.sortBy) {
            const sortBy = options.sortBy;
            const sortOrder = options.sortOrder === "desc" ? -1 : 1;

            result.sort((a, b) => {
                const valA = a[sortBy];
                const valB = b[sortBy];

                if (valA < valB) return -1 * sortOrder;
                if (valA > valB) return 1 * sortOrder;
                return 0;
            });
        }

        const total = result.length;

        if (options.page && options.limit) {
            const page = options.page > 0 ? options.page : 1;
            const limit = options.limit > 0 ? options.limit : 10;
            const startIndex = (page - 1) * limit;
            result = result.slice(startIndex, startIndex + limit);
        }

        return { data: result, total };
    }

    findById(id: number): ComplaintModel | undefined {
        return complaints.find((c) => c.id === id);
    }

    update(id: number, updates: Partial<ComplaintModel>): ComplaintModel | null {
        const complaint = this.findById(id);
        if (!complaint) return null;

        Object.assign(complaint, updates);
        return complaint;
    }

    delete(id: number): boolean {
        const index = complaints.findIndex((c) => c.id === id);
        if (index === -1) return false;

        complaints.splice(index, 1);
        return true;
    }
}
