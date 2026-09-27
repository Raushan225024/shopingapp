const app = require("./app");

const { port } = require("./config/env");
const { startEmailConsumer } = require("./consumers/email.consumer");

const server = app.listen(port, async () => {
  console.log(
    `Notification service running on port ${port}`
  );

  try {
    await startEmailConsumer();

    console.log(
      "Notification email consumer started"
    );
  } catch (error) {
    console.error(
      "Failed to start email consumer:",
      error
    );

    // Stop HTTP server if Kafka consumer fails
    server.close(() => {
      process.exit(1);
    });
  }
});