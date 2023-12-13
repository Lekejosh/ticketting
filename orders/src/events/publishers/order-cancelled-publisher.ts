import {
  OrderCancelledEvents,
  Publisher,
  Subjects,
} from "@lekesktickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvents> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
