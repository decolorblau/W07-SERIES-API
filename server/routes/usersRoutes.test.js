require("dotenv").config();
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const { app, initializeServer } = require("../index");
const initializeMongoDB = require("../../database/index");
const User = require("../../database/models/user");

const request = supertest(app);
let server;
let token;

beforeAll(async () => {
  await initializeMongoDB(process.env.DB_STRING_TEST);
  server = await initializeServer(4005);
  const loginResponse = await request
    .post("/users/login")
    .send({ username: "admin", password: "admin" })
    .expect(200);
  token = loginResponse.body.token;
});

beforeEach(async () => {
  await User.deleteMany();
  await User.create({
    username: "admin",
    password: await bcrypt.hash("admin", 10),
    admin: true,
  });
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.connection.close();
    done();
  });
});

describe("Given the user routes", () => {
  describe("When it receives a POST ", () => {
    test("Then it should return a 200 status", async () => {
      const { body } = await request
        .post("/users/login")
        .send({ username: "admin", password: "admin" })
        .expect(200);

      expect(body.token).toBeDefined();
      expect(body).toHaveProperty("token");
    });
  });

  describe("When it receives a POST ", () => {
    test("Then it should return a 201 status", async () => {
      const { body } = await request
        .post("/users/register")
        .send({ username: "testing", password: "testing" })
        .expect(201);

      const expectedUserName = "testing";

      expect(body).toHaveProperty("username" && "password");
      expect(body).toHaveProperty("username", expectedUserName);
    });
  });
});
