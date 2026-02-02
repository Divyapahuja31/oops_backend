import { ComplaintStatus } from "./complaint.enums";

export interface Complaint {
  id: number;
  title: string;
  description: string;
  status: ComplaintStatus;
}
