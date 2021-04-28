import {describe, it} from "@jest/globals";

const request = require("supertest")
const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(require("body-parser").json())
app.use(require("../src/server/userApi"))

describe("userApi", () => {
    it("Can return the predefined menu", async () => {
        await request(app).get("")
            .then(response => {
                expect(response.body.find(({id}) => id === 2)).toMatchObject({
                    firstName: "Henrik"
                })
            })
    })

    it('should add new user', async function () {
        await request(app)
            .post("").send({
                id: 3,
                firstName: "Ole",
                lastName: "Kallerud",
                password: "1234"
            }).expect(201)
        await request(app)
            .get("")
            .then((response) => {
                expect(response.body.map(({firstName}) => firstName)).toContain("Ole")
            })
    });

    it("can update existing user", async () => {
        const user = (await request(app).get("/2")).body;
        const updated = {
            ...user,
            firstName: "Henrik",
        };
        await request(app).put("/2").send(updated).expect(200);
        await request(app)
            .get("/2")
            .then((response) => {
                expect(response.body).toMatchObject({
                    id: 2,
                    firstName: "Henrik",
                });
            });
    });
})