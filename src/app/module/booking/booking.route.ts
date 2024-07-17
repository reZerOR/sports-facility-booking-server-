import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { BookingValidation } from "./booking.validation";
import { BookingController } from "./booking.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.contstant";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(BookingValidation.bookingValidationSchema),
  BookingController.createBooking
);

export const BookingRoutes = router;
