import { Router } from "express";
import { authControllers } from "./auth.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middleware/validateRequest";
import { authValidation } from "./auth.validation";

const router = Router();

router.post("/login", authControllers.login);
router.post(
  "/refresh-token",
  validateRequest(authValidation.refreshTokenValidationSchema),
  authControllers.refreshToken
);
router.patch(
  "/change-password",
  auth(USER_ROLE.sub_admin, USER_ROLE.super_admin),
  authControllers.changePassword
);
router.patch("/forgot-password", authControllers.forgotPassword);
router.patch("/reset-password", authControllers.resetPassword);
export const authRoutes = router;
