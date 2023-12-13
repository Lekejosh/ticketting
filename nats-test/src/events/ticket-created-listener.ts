import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./tickets-created-events";
export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = "payments-services";
  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("Event Data", data);

    console.log(data.id);
    console.log(data.price);
    console.log(data.title);

    msg.ack();
  }
}
