import Server from "./server";

(async () => {
    await Server.start();
})();

// listen on SIGINT signal and gracefully stop the server
process.on("SIGINT", () => {
    console.info("Stopping fastify search server");

    Server.stop().then(err => {
        console.info(`Server stopped`);
        process.exit(err ? 1 : 0);
    });
});
