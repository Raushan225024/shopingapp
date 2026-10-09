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
 
    const nodeEnv = process.env.NODE_ENV || "development";
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailFrom = process.env.EMAIL_FROM;
    const kafkaBrokers = process.env.KAFKA_BROKERS ;
    const kafkaClientId = process.env.KAFKA_CLIENT_ID || "notification-service";
    const kafkaGroupId = process.env.KAFKA_GROUP_ID || "notification-email-group";
    const emailTopic = process.env.KAFKA_EMAIL_TOPIC || "email.notification";
    const redisUrl = process.env.AUTH_REDIS_URL || "redis://localhost:6379";
    const port = Number(process.env.PORT) || 5002;
export {
    nodeEnv,
    resendApiKey,
    emailFrom,
    kafkaBrokers,
    kafkaClientId,
    kafkaGroupId,
    emailTopic,
    redisUrl,
    port
};