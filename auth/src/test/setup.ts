import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { mongo } from "mongoose";
import { app } from "../app";

declare global {
  var signin: () => Promise<string[]>;
}

let mongod: any;
beforeAll(async () => {
  process.env.JWT_KEY = "lmfao";
  mongod = await MongoMemoryServer.create();
  const mongoUri = mongod.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany();
  }
});

afterAll(async () => {
  await mongod.stop();
  await mongoose.disconnect();
});

global.signin = async (): Promise<string[]> => {
  const email = "test@test.com";
  const password = "password";
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email, password })
    .expect(201);

  const cookie = response.get("Set-Cookie");
  return cookie;
};
