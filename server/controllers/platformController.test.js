const Platform = require("../../database/models/platform");

const {
  getPlatforms,
  createPlatform,
  editPlatform,
} = require("./platformController");

jest.mock("../../database/models/platform");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Given the getPlatforms function", () => {
  describe("When it receives an object res and a resolved promise", () => {
    test("Then it should invoke the method json", async () => {
      const platforms = [
        {
          name: "elegante",
        },
        {
          name: "platform-test",
        },
      ];

      Platform.find = jest.fn().mockResolvedValue(platforms);
      const res = {
        json: jest.fn(),
      };

      await getPlatforms(null, res);

      expect(Platform.find).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenLastCalledWith(platforms);
    });
  });

  describe("When it receives an object res and a rejected promise", () => {
    test("Then it should invoke the next function", async () => {
      Platform.find = jest.fn().mockRejectedValue();
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();

      await getPlatforms(null, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Given the createPlatform function", () => {
  describe("When it receives a req of a not admin user, and a next function", () => {
    test("Then it should invoke the next function with a expectedError", async () => {
      const req = {
        userData: {
          username: "user",
          password: "password",
          admin: false,
        },
      };

      const next = jest.fn();
      const expectedError = new Error(
        "You are not authorized to create a platform."
      );

      await createPlatform(req, null, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(expectedError);
      expect(next.mock.calls[0][0].code).toBe(401);
    });
  });

  describe("When it receives a req of a admin user, and a req & res object", () => {
    test("Then it should create the platform and invoke the status and json methods", async () => {
      const req = {
        userData: {
          username: "user",
          password: "password",
          admin: true,
        },
        body: {
          name: "platform-test",
        },
      };
      const res = mockResponse();
      const expectedStatus = 201;

      Platform.create = jest.fn().mockResolvedValue(req.body);
      await createPlatform(req, res, () => {});

      expect(Platform.create).toHaveBeenCalledWith(req.body);
      expect(res.json).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a admin user, and rejected promise", () => {
    test("Then it should invoke the next function with a expectedError", async () => {
      const req = {
        userData: {
          username: "user",
          password: "password",
          admin: true,
        },
      };
      Platform.create = jest.fn().mockRejectedValue();
      const next = jest.fn();
      await createPlatform(req, null, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Given the editPlatform function", () => {
  describe("When it receives an not admin user and a next function", () => {
    test("Then it should invoke the next function with a expectedError", async () => {
      const req = {
        userData: {
          username: "user",
          password: "password",
          admin: false,
        },
        params: {
          id: 1,
        },
      };
      const next = jest.fn();
      const expectedError = new Error(
        "You are not authorized to edit a platform."
      );

      await editPlatform(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives an admin user and a rejected function", () => {
    test("Then it should invoke the next function", async () => {
      const req = {
        userData: {
          username: "user",
          password: "password",
          admin: true,
        },
        params: {
          id: 1,
        },
      };
      const next = jest.fn();

      Platform.findByIdAndUpdate = jest.fn().mockRejectedValue();
      await editPlatform(req, null, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe("When it receives an admin user and a resolved function with a valid id", () => {
    test("Then it should invoke the  function with a expectedError", async () => {
      const req = {
        userData: {
          username: "user",
          password: "password",
          admin: true,
        },
        params: {
          id: 1,
        },
        body: {
          name: "platform-test",
          id: 1,
        },
      };

      const res = mockResponse();
      Platform.findByIdAndUpdate = jest.fn().mockResolvedValue(req.body);
      await editPlatform(req, res, () => {});

      expect(res.json).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("When it receives an admin user and a resolved function with a invalid id", () => {
    test("Then it should invoke the  function with a expectedError", async () => {
      const req = {
        userData: {
          username: "user",
          password: "password",
          admin: true,
        },
        params: {
          id: 1,
        },
        body: {
          name: "platform-test",
          id: 1,
        },
      };

      const next = jest.fn();
      const expectedError = new Error("Platform not found.");
      Platform.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
      await editPlatform(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(next.mock.calls[0][0].code).toBe(404);
    });
  });
});
