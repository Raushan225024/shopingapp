require("dotenv").config();

const requiredEnv = [
  "RESEND_API_KEY",
  "EMAIL_FROM",
  "KAFKA_BROKERS",
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

module.exports = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: Number(process.env.PORT) || 5000,

  resendApiKey: process.env.RESEND_API_KEY,
  emailFrom: process.env.EMAIL_FROM,

  kafkaBrokers: process.env.KAFKA_BROKERS.split(","),

  kafkaClientId:
    process.env.KAFKA_CLIENT_ID || "notification-service",

  kafkaGroupId:
    process.env.KAFKA_GROUP_ID || "notification-email-group",

  emailTopic:
    process.env.KAFKA_EMAIL_TOPIC || "email.notification",
};