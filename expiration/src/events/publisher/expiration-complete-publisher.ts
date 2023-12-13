import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@lekesktickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
