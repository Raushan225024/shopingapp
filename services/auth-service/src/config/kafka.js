import{kafkaBrokers,kafkaClintId} from"./env.js";
import{Kafka} from "kafkajs";

const kafka = new Kafka({
    borkers:kafkaBrokers,
    clintId:kafkaClintId,
    retry:{
        initialRetryTime:300,
        retries:8
    }
});

const producer = kafka.producer();

module.exports = {
    kafka,
    producer
};