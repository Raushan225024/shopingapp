import dotenv from 'dotenv';
dotenv.config();
 const requiredEnv = [
   "RESEND_API_KEY",
   "EMAIL_FROM",
   "KAFKA_BROKERS",
 ];
 let i=0;
 while(i<requiredEnv.length){
    if (!process.env[requiredEnv[i]]) {
      console.error(`Environment variable ${requiredEnv[i]} is not set`);
      process.exit(1);
    }
    i++;
 }
 module.exports ={
    nodeEnv: process.env.NODE_ENV || "development",
    resendApiKey: process.env.RESEND_API_KEY,
    emailFrom: process.env.EMAIL_FROM,
    kafkaBrokers: process.env.KAFKA_BROKERS,
    kafkaClientId: process.env.KAFKA_CLIENT_ID || "notification-service",
    kafkaGroupId: process.env.KAFKA_GROUP_ID || "notification-email-group",
    emailTopic: process.env.KAFKA_EMAIL_TOPIC || "email.notification",
    port: Number(process.env.PORT) || 5000,
 }