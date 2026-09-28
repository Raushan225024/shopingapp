
import redisClient from "../config/redis.js";

export async function saveOTP(userId, otp) {
    try {
        // Validate input
        if (!userId) {
            throw new Error("User ID is required");
        }

        if (!otp) {
            throw new Error("OTP is required");
        }

        // Make sure Redis is connected
        if (!redisClient.isReady) {
            throw new Error("Redis is not connected");
        }

        const key = `auth:otp:${userId}`;

        // Store OTP for 5 minutes
        await redisClient.set(key, otp, {
            EX: 300
        });

        console.log(`OTP saved successfully for user: ${userId}`);

        return {
            success: true,
            message: "OTP saved successfully"
        };

    } catch (error) {
        console.error("Error saving OTP:", error);

        return {
            success: false,
            message: "Failed to save OTP",
            error: error.message
        };
    }
}

export async function verifyOTP(userId, otp) {
    try {
        // Validate input
        if (!userId) {
            throw new Error("User ID is required");
        }
        if (!otp) {
            throw new Error("OTP is required");
        }

        // Make sure Redis is connected
        if (!redisClient.isReady) {
            throw new Error("Redis is not connected");
        }

        const key = `auth:otp:${userId}`;
        const storedOtp = await redisClient.get(key);

        if (!storedOtp) {
            throw new Error("Invalid or expired OTP");
        }

        if (storedOtp !== otp) {
            throw new Error("Invalid OTP");
        }

        // Delete the OTP from Redis
        await redisClient.del(key);

        console.log(`OTP verified successfully for user: ${userId}`);

        return {
            success: true,
            message: "OTP verified successfully"
        };

    } catch (error) {
        console.error("Error verifying OTP:", error);

        return {
            success: false,
            message: "Failed to verify OTP",
            error: error.message
        };
    }
}