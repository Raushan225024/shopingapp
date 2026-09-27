const { Kafka } = require("kafkajs");

const {
  kafkaBrokers,
  kafkaClientId,
} = require("./env");

const kafka = new Kafka({
  clientId: kafkaClientId,
  brokers: kafkaBrokers,

  retry: {
    initialRetryTime: 300,
    retries: 8,
  },
});

const producer = kafka.producer();

const consumer = kafka.consumer({
  groupId: process.env.KAFKA_GROUP_ID || "notification-email-group",
});

module.exports = {
  kafka,
  producer,
  consumer,
};