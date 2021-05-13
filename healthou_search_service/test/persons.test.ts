
import { expect } from "chai";
import Server from "../src/server";

describe("Persons", () => {
    it("handler", async () => {
        const app = await Server.testServer();
        const response = await app.inject({
            method: "GET",
            url: "/persons",
        });
        expect(response.statusCode).to.equal(200);
        expect(response.headers["content-type"]).to.equal("application/json; charset=utf-8");
        const persons = JSON.parse(response.body);
        expect(persons.length).to.equal(1);
        expect(persons[0].firstName).to.equal("Rick");
        expect(persons[0].lastName).to.equal("Sanchez");
    });
});
