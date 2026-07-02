import { Router } from "express";
import { authController } from "../../../container/auth.container";
import { validateRequest } from "../../../middleware/validateRequest";
import { asyncHandler } from "../../../middleware/asyncHandler";
import { registerSchema, loginSchema } from "../validations/auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  asyncHandler(authController.register),
);
router.post(
  "/login",
  validateRequest(loginSchema),
  asyncHandler(authController.login),
);
router.post("/logout", asyncHandler(authController.logout));
router.post("/refresh-token", asyncHandler(authController.refreshToken));

export { router as authRouter };
