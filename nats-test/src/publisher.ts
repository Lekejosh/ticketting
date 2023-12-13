import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/tickets-create-publisher";

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connect to NATS");

  const publisher = new TicketCreatedPublisher(stan);
  await publisher.publish({
    id: "123",
    title: "3983u2832",
    price: 4000,
  });
});
