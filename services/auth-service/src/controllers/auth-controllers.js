import {producer} from "../config/kafka.js";
import {emailTopic} from "../config/env.js";
import {saveOTP, verifyOTP} from "../services/otp-service.js";

export const getOtp = async (req, res) => {
    try {
        const userId = req.query.email;
        console.log("Received request for OTP for user:", userId);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
       // const result=await saveOTP(userId, otp);
       // cosole.log("OTP saved result:", result);
       // if(!result.success){
         //   return res.status(500).json({ error: result.message });
        //}
        const message = {
            tosend: userId,
            subject: "<h1>OTP Verification</h1>",
            message: `<p>Your OTP is: <strong>${otp}</strong> don't share it with anyone.</p>`,
        };
        
        await producer.send({
            topic: emailTopic,
            messages: [ { value: JSON.stringify(message) } ]
        });
        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ error: "Failed to send OTP" });
    }
};

export const verifyOtp = async (req, res) => {
    try{
        const userId = req.query.email;
        const otp = req.query.otp;
        const result=await verifyOTP(userId, otp);
        if(!result.success){
            return res.status(400).json({ error: result.message });
        }
        res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ error: "Failed to verify OTP" });
    }
};