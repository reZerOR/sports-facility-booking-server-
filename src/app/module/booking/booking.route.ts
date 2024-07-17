import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { BookingValidation } from "./booking.validation";
import { BookingController } from "./booking.controller";

const router = Router();

router.post(
  "/",
  validateRequest(BookingValidation.bookingValidationSchema),
  BookingController.createBooking
);

export const BookingRoutes = router;
