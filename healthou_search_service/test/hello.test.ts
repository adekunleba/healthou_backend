
import { expect } from "chai";
import Server from "../src/server";

describe("Hello", () => {
    it("handler", async () => {
        const app = await Server.testServer();
        const response = await app.inject({
            method: "GET",
            url: "/",
        });
        expect(response.statusCode).to.equal(200);
        expect(response.headers["content-type"]).to.equal("text/html; charset=utf-8");
        expect(response.body).to.contain("Hallo!");
    });
});
