import {kafka,producer} from "../config/kafka.js";
import { otpTopic } from "../config/env.js";
import {saveOtp, verifyOtp} from "../services/otp-service.js";

exports.getOtp = async (req, res) => {
    try {
        const userId = req.body.userId;
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const result=await saveOtp(userId, otp);
        if(!result.success){
            return res.status(500).json({ error: result.message });
        }
        const message = {
            tosend: userId,
            subject: "<h1>OTP Verification</h1>",
            message: `<p>Your OTP is: <strong>${otp}</strong> don't share it with anyone.</p>`,
        };
        await producer.send({
            topic: otpTopic,
            messages: [ { value: JSON.stringify(message) } ]
        });
        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ error: "Failed to send OTP" });
    }
};

exports.verifyOtp = async (req, res) => {
    try{
        const userId = req.body.userId;
        const otp = req.body.otp;
        const result=await verifyOtp(userId, otp);
        if(!result.success){
            return res.status(400).json({ error: result.message });
        }
        res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ error: "Failed to verify OTP" });
    }
};