import { Complaint } from "../utils/complaint.interface";
import { ComplaintStatus } from "../utils/complaint.enums";

export class ComplaintModel implements Complaint {
  id: number;
  title: string;
  description: string;
  status: ComplaintStatus;

  constructor(id: number, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = ComplaintStatus.PENDING;
  }

  resolve(): void {
    this.status = ComplaintStatus.RESOLVED;
  }
}
