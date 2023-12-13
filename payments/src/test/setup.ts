import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { mongo } from "mongoose";
import { app } from "../app";
import jwt from "jsonwebtoken";

declare global {
  var signin: (id?: string) => string;
}
jest.mock("../nats-wrapper");

process.env.STRIPE_KEY = "sk_test_hnfrAm8rOkryFEnV23jjfFlw";
let mongod: any;
beforeAll(async () => {
  process.env.JWT_KEY = "lmfao";
  mongod = await MongoMemoryServer.create();
  const mongoUri = mongod.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany();
  }
});

afterAll(async () => {
  await mongod.stop();
  await mongoose.disconnect();
});

global.signin = (id?: string): string => {
  // Build a JWT payload.  { id, email }
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string thats the cookie with the encoded data
  return `express:sess=${base64}`;
};
