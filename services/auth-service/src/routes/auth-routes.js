import express from "express";
const router = express.Router();
import { getOtp,verifyOtp,} from "../controllers/auth-controller.js";

router.post("/get-otp", getOtp);
router.post("/verify-otp", verifyOtp);
router.get("/health", (req, res) => {
  res.status(200).json({
    service: "auth-service",
    status: "UP",
  });
});
export default router;