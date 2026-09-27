const { consumer } = require("../config/kafka");
const { emailTopic } = require("../config/env");
const { sendEmail } = require("../services/email.service");

async function startEmailConsumer() {
  await consumer.connect();

  await consumer.subscribe({
    topic: emailTopic,
    fromBeginning: false,
  });

  console.log(
    `Email consumer subscribed to topic: ${emailTopic}`
  );

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const data = JSON.parse(message.value.toString());

        console.log("Received email event:", data);

        const {
          toSend,
          subject,
          message: emailMessage,
        } = data;

        if (!toSend || !subject || !emailMessage) {
          throw new Error(
            "Invalid email event: toSend, subject and message are required"
          );
        }

        await sendEmail(
          toSend,
          subject,
          emailMessage
        );

        console.log(
          `Email processed successfully | partition=${partition} | offset=${message.offset}`
        );
      } catch (error) {
        console.error(
          `Email processing failed | partition=${partition} | offset=${message.offset}`,
          error
        );

        /*
         * Important:
         *
         * Don't silently ignore the error.
         *
         * In a production system you can later implement:
         * - retry topic
         * - dead-letter topic
         * - exponential backoff
         */
      }
    },
  });
}

module.exports = {
  startEmailConsumer,
};