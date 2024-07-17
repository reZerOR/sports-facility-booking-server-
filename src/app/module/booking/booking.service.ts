import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { Facility } from "../facility/facility.model";
import { TBooking } from "./booking.interface";
import { calculatePayableAmount } from "./booking.utiles";
import { TFacility } from "../facility/facility.interface";

const createBookingIntoDB = async (paylod: Partial<TBooking>, userId: string) => {
  const { facility, startTime, endTime, date } = paylod;
  // check availability
  // find facility exist
  const isFacilityExist = await Facility.findOne({
    _id: paylod.facility,
    isDeleted: false,
  });
  if (!isFacilityExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Facility not found");
  }

  const payableAmount = calculatePayableAmount(
    startTime!,
    endTime!,
    isFacilityExist.pricePerHour
  );
  return payableAmount;
  // calculate payable amount
};

export const BookingServices = {
  createBookingIntoDB,
};
