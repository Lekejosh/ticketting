import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  var signin: () => string;
}

jest.mock("../nats-wrapper");

let mongod: any;
beforeAll(async () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  process.env.JWT_KEY = "lmfao";
  mongod = await MongoMemoryServer.create();
  const mongoUri = mongod.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongod.stop();
  await mongoose.disconnect();
});
global.signin = (): string => {
  //Build a JWT payload {id,email}
  const id = new mongoose.Types.ObjectId().toHexString();
  const payload = {
    id: id,
    email: "test@test.com",
  };
  //Create the JWT auth token
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  //Build the session object {jwt:MY_JWT}
  const session = { jwt: token };

  //Turn the session into JSON
  const sessionJSON = JSON.stringify(session);
  //Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  //return a string
  return `session=${base64}`;
};
