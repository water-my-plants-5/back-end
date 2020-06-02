const request = require("supertest");
const server = require("../index");
const db = require("../database/config");

describe("auth-router", function () {

    describe("post /plants", function () {
        beforeEach(async () => {
            await db("plants").truncate();
        });

        it("return 404  on error", async function () {
            await request(server)
                .post("/plants")
                .send({ nickname: "newPlant" })
                .then(res => {
                    expect(res.status).toBe(500);
                });
        });

    });
})