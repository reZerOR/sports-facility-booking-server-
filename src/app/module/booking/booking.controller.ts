import httpStatus from "http-status";
import { catchAsync } from "../../utilities/catchAsync";
import { sendResponse } from "../../utilities/sendResponse";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res)=>{
    const result = await BookingServices.createBookingIntoDB(req.body)
    sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bookings retrieved successfully",
    data: result
    })
})


export const BookingController = {
    createBooking
}