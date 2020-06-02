const supertest = require("supertest");
const server = require("../index");
const db = require("../database/config")






test("get /", async () => {
    const res = await supertest(server).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.message).toMatch("Let's water some plants!");
});
