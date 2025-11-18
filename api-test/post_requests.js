const axios = require("axios");
const { expect } = require("chai");

const BASE_URL = "http://3.90.159.31:3000/api";

describe("POST API REQUEST TESTS", () => {
  it("should create a new user successfully", async () => {
    const user = {
      name: "Test User",
      email: `testuser_${Date.now()}@example.com`,
      password: "password12344",
    };

    const res = await axios.post(`${BASE_URL}/signup`, user);

    console.log("\n✅ USER CREATED SUCCESSFULLY");
    console.log("Name:", user.name);
    console.log("Email:", user.email);
    console.log("Password:", user.password);
    console.log("Response:", res.data);

    expect(res.status).to.equal(201);
    expect(res.data).to.have.property("message", "User created");
    expect(res.data).to.have.property("userId");
  });

  it("should fail signup if fields are missing", async () => {
    try {
      await axios.post(`${BASE_URL}/signup`, { name: "No Email" });
    } catch (err) {
      expect(err.response.status).to.equal(400);
      expect(err.response.data).to.have.property("message", "All fields are required");
    }
  });

  it("should fail signup if email already exists", async () => {
    const user = {
      name: "Duplicate User",
      email: "testuser@example.com",
      password: "password123",
    };
    try {
      await axios.post(`${BASE_URL}/signup`, user);
    } catch (err) {
      expect(err.response.status).to.equal(409);
      expect(err.response.data).to.have.property("message", "User already exists");
    }
  });

  it("should login successfully with correct credentials", async () => {
    const credentials = {
      email: "testuser@example.com",
      password: "password123",
    };
    const res = await axios.post(`${BASE_URL}/login`, credentials);

    console.log("\n✅ LOGIN SUCCESSFUL");
    console.log("Email:", credentials.email);
    console.log("Password:", credentials.password);
    console.log("Response:", res.data);

    expect(res.status).to.equal(200);
    expect(res.data).to.have.property("message", "Login successful");
    expect(res.data).to.have.property("userId");
  });

  it("should fail login with wrong password", async () => {
    try {
      await axios.post(`${BASE_URL}/login`, {
        email: "testuser@example.com",
        password: "wrongpass",
      });
    } catch (err) {
      expect(err.response.status).to.equal(401);
      expect(err.response.data).to.have.property("message", "Invalid email or password");
    }
  });

  it("should fail login if email does not exist", async () => {
    try {
      await axios.post(`${BASE_URL}/login`, {
        email: "nouser@example.com",
        password: "password123",
      });
    } catch (err) {
      expect(err.response.status).to.equal(401);
      expect(err.response.data).to.have.property("message", "Invalid email or password");
    }
  });

  it("should fail login if fields are missing", async () => {
    try {
      await axios.post(`${BASE_URL}/login`, { email: "testuser@example.com" });
    } catch (err) {
      expect(err.response.status).to.equal(400);
      expect(err.response.data).to.have.property("message", "Email and password are required");
    }
  });

  it("should add a new product", async () => {
    const product = { name: "Test Product", price: 99.99, stock: 10 };
    const res = await axios.post(`${BASE_URL}/products`, product);

    console.log("\n✅ PRODUCT ADDED SUCCESSFULLY");
    console.log("Name:", product.name);
    console.log("Price:", product.price);
    console.log("Stock:", product.stock);
    console.log("Response:", res.data);

    expect(res.status).to.equal(201);
    expect(res.data).to.have.property("message", "Product added");
    expect(res.data).to.have.property("productId");
  });
});
