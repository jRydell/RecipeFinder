import { Router } from "express";
import { validate } from "../middleware/validation";
import { registerSchema, loginSchema } from "../validation/auth.validation";
import * as authController from "../controllers/auth.controller";

const router = Router();

router.post(
  "/register",
  validate(registerSchema, "body"),
  authController.register
);
router.post("/login", validate(loginSchema, "body"), authController.login);

export default router;
