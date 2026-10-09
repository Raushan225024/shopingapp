import{ kafkaClientId,kafkaBrokers} from "./env.js";
import{Kafka} from "kafkajs";
console.log("Kafka Client ID:", kafkaClientId);
console.log("Kafka Brokers:", kafkaBrokers);
const kafka = new Kafka({
    brokers:kafkaBrokers.split(","),
    clientId:kafkaClientId,
    retry:{
        initialRetryTime:300,
        retries:8
    }
});

const producer = kafka.producer();

 export {
    kafka,
    producer
};