import {
  Listener,
  OrderCancelledEvents,
  Subjects,
} from "@lekesktickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Buffer } from "node:buffer";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { Ticket } from "../../model/tickets";

export class OrderCancelledListener extends Listener<OrderCancelledEvents> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvents["data"], msg: Message) {
    let id: string;
    //@ts-ignore
    const buf = Buffer.from(data.ticket.id!.data, "utf8");
    id = buf.toString("hex");
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    ticket.set({ orderId: undefined });
    await ticket.save();
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      orderId: ticket.orderId,
      userId: ticket.userId,
      price: ticket.price,
      title: ticket.title,
      version: ticket.version,
    });

    msg.ack();
  }
}
