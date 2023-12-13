export enum OrderStatus {
  //When the order has been created, but the
  // ticker it is trying to order has not been reserved
  Created = "created",

  //the ticket the order is trying to rserve has already
  // been reserved or when the user has cancelled the order
  //The order expires before payment
  Cancelled = "cancelled",

  //Order has successfully reserved the ticket
  AwaitingPayment = "awaiting:payment",

  //The order has been paid
  Complete = "complete",
}
