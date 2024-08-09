import moment from "moment";
import { Booking } from "../booking/booking.model";
import { isValidAndFutureDate } from "../../middleware/isValidateAndFutureDate";

const checkAvailability = async (payload: string | undefined) => {

  const date = payload ? payload : moment().format("YYYY-MM-DD");
  console.log(payload, date);

  // Fetch all bookings for the given date
  const bookings = await Booking.find({ date });
  console.log(bookings);

  // Example logic to determine available time slots
  const allTimeSlots = [
    { startTime: "08:00", endTime: "10:00" },
    // { startTime: "10:00", endTime: "12:00" },
    { startTime: "12:00", endTime: "14:00" },
    { startTime: "14:00", endTime: "16:00" },
    { startTime: "16:00", endTime: "18:00" },
  ];
  console.log(bookings.length);

  // if(bookings.length === 0){
  //     console.log('0');
  //     return allTimeSlots
  // }
  // console.log('1');

  const availableTimeSlots = allTimeSlots.filter((slot) => {
    return !bookings.some(
      (booking) =>
        moment(slot.startTime, "HH:mm").isBetween(
          moment(booking.startTime, "HH:mm"),
          moment(booking.endTime, "HH:mm"),
          undefined,
          "[)"
        ) ||
        moment(slot.endTime, "HH:mm").isBetween(
          moment(booking.startTime, "HH:mm"),
          moment(booking.endTime, "HH:mm"),
          undefined,
          "(]"
        )
    );
  });
  return availableTimeSlots;
};

export const AvailabilityService = {
  checkAvailability,
};
