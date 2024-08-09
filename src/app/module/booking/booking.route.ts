import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { BookingValidation } from "./booking.validation";
import { BookingController } from "./booking.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.contstant";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(BookingValidation.bookingValidationSchema),
  BookingController.createBooking
);
router.get(
  "/",
  auth(USER_ROLE.admin),
  BookingController.allBookings
);
router.get(
  "/user",
  auth(USER_ROLE.admin),
  BookingController.allUserBookings
);
router.delete(
  "/:id",
  auth(USER_ROLE.admin),
  BookingController.calcelBooking
);

export const BookingRoutes = router;
