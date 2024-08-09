import httpStatus from "http-status";
import { catchAsync } from "../../utilities/catchAsync";
import { sendResponse } from "../../utilities/sendResponse";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(
    req.body,
    req.user.id
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bookings created successfully",
    data: result,
  });
});

const allBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.allBookingFromDB();
  const isDataAvailable = result.length !== 0;
  sendResponse(res, {
    success: isDataAvailable,
    statusCode: isDataAvailable ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: isDataAvailable
      ? "Bookings retrieved successfully"
      : "No Data Found",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  allBookings
};
