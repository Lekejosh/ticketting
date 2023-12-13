import { Subjects } from "./subjects";

export interface OrderCancelledEvents {
  subject: Subjects.OrderCancelled;
  data: {
    id: string;
    version: number;
    ticket: {
      id: string;
    };
  };
}
