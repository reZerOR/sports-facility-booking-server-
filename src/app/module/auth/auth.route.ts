import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "../user/user.validation";
import { AuthControllers } from "./auth.controller";

const router = Router();

router.post(
  "/signup",
  validateRequest(UserValidation.userValidationSchema),
  AuthControllers.signUp
);


export const AuthRoutes = router
