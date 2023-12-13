import {
  PaymentCreatedEvent,
  Publisher,
  Subjects,
} from "@lekesktickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
