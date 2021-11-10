const Platform = require("../../database/models/platform");

const { getPlatforms } = require("./platformController");

jest.mock("../../database/models/platform");

describe("Given a getPlatform function", () => {
  describe("When it receives an object res", () => {
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

      expect(Platform.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenLastCalledWith(platforms);
    });
  });
});
