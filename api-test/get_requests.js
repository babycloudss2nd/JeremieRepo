const axios = require("axios");
const { expect } = require("chai");

const BASE_URL = "http://localhost:3000/api";

describe("GET API REQUEST TESTS", () => {

  it("should fetch all products", async () => {
    const res = await axios.get(`${BASE_URL}/products`);
    console.log("Products fetched:", res.data);
    expect(res.status).to.equal(200);
    expect(res.data).to.be.an("array");
  });

  it("should return 404 for invalid endpoint", async () => {
    try {
      await axios.get(`${BASE_URL}/invalid-endpoint`);
    } catch (err) {
      expect(err.response.status).to.equal(404);
    }
  });

});
