const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, loginUser } = require("./usersController");
const User = require("../../database/models/user");

jest.mock("../../database/models/user");
jest.mock("jsonwebtoken");
jest.mock("bcrypt");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Given the createUser function", () => {
  describe("When it receives the req res objects and the promise resolves", () => {
    test("Then it should invoke the method json and status", async () => {
      const req = {
        body: {
          username: "test",
          password: "test",
          admin: false,
        },
      };
      const res = mockResponse();

      const expectedStatus = 201;
      User.create = jest.fn().mockResolvedValue(req.body);
      await createUser(req, res, () => {});

      expect(res.json).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives the req object , the next function, and the promise rejects", () => {
    test("Then it should invoke the method json", async () => {
      const req = {
        body: {
          username: "test",
          password: "test",
          admin: false,
        },
      };

      const next = jest.fn();
      const error = new Error("Error creating the user");

      User.create = jest.fn().mockRejectedValue();
      await createUser(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given the loginUser function", () => {
  describe("When it receives the req object and the promise rejects", () => {
    test("Then it should invoke the next function with a error", async () => {
      const req = {
        body: {
          username: "test",
          password: "test",
        },
      };

      const next = jest.fn();
      const error = new Error("Error logging in the user");

      User.findOne = jest.fn().mockRejectedValue(null);
      await loginUser(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives the req object, the next function and promise resolves null", () => {
    test("Then it should invoke the next function with a error", async () => {
      const req = {
        body: {
          username: "test",
          password: "test",
        },
      };

      const next = jest.fn();
      const error = new Error("Wrong credentials");

      User.findOne = jest.fn().mockResolvedValue(null);
      await loginUser(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives the req object, the next function and promise resolves, but the password is wrong", () => {
    test("Then it should invoke the next function with a error", async () => {
      const req = {
        body: {
          username: "test",
          password: "test",
        },
      };

      const next = jest.fn();
      const error = new Error("Wrong credentials");

      bcrypt.compare = jest.fn().mockResolvedValue(false);
      User.findOne = jest.fn().mockResolvedValue(null);
      await loginUser(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives the req object, the next function and promise resolves with all the credentials good", () => {
    test("Then it should invoke the json method with", async () => {
      const req = {
        body: {
          id: 1,
          username: "test",
          password: "test",
        },
      };

      const res = mockResponse();

      const expectedToken = 123;

      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue(expectedToken);
      User.findOne = jest.fn().mockResolvedValue(req.body);
      await loginUser(req, res, () => {});

      expect(res.json).toHaveBeenCalledWith({ token: expectedToken });
    });
  });
});
