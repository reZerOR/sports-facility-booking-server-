import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "../user/user.validation";
import { AuthControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post(
  "/signup",
  validateRequest(UserValidation.userValidationSchema),
  AuthControllers.signUp
);
router.post(
  "/login",
  validateRequest(AuthValidation.authValidationSchema),
  AuthControllers.loginUser
);

export const AuthRoutes = router;
