import express from "express";
const router = express.Router();
import { getOtp,verifyOtp} from "../controllers/auth-controllers.js";

router.get("/get-otp", getOtp);
router.get("/verify-otp", verifyOtp);
router.get("/health", (req, res) => {
  res.status(200).json({
    service: "auth-service",
    status: "UP",
  });
});
export default router;