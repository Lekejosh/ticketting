import { Publisher, Subjects, OrderCreatedEvent } from "@lekesktickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
