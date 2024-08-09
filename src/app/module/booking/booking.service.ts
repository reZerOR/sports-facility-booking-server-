import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { Facility } from "../facility/facility.model";
import { TBooking } from "./booking.interface";
import { calculatePayableAmount } from "./booking.utiles";
import moment from "moment";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (
  paylod: Partial<TBooking>,
  userId: string
) => {
  const { facility, startTime, endTime, date } = paylod;
  // find facility exist
  const isFacilityExist = await Facility.findOne({
    _id: facility,
    isDeleted: false,
  });
  if (!isFacilityExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Facility not found");
  }

  // check availability
  const bookings = await Booking.find({ date });
  const isRequestedSlotAvailable = !bookings.some(
    (booking) =>
      moment(startTime, "HH:mm").isBetween(
        moment(booking.startTime, "HH:mm"),
        moment(booking.endTime, "HH:mm"),
        undefined,
        "[)"
      ) ||
      moment(endTime, "HH:mm").isBetween(
        moment(booking.startTime, "HH:mm"),
        moment(booking.endTime, "HH:mm"),
        undefined,
        "(]"
      )
  );
  if (!isRequestedSlotAvailable) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Requested slot is not available"
    );
  }

  // calculate payable amount
  const payableAmount = calculatePayableAmount(
    startTime!,
    endTime!,
    isFacilityExist.pricePerHour
  );

  // create booking
  const createBooking = await Booking.create({
    ...paylod,
    payableAmount,
    user: userId,
  });
  return createBooking;
};
const allBookingFromDB = async() => {
  const bookings = await Booking.find().populate("user", '-password').populate("facility");
  return bookings
}

export const BookingServices = {
  createBookingIntoDB,
  allBookingFromDB
};
