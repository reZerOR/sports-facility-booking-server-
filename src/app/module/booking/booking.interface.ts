type TBooking = {
  user: string;
  facility: string;
  date: string;
  startTime: string;
  endTime: string;
  payableAmount: number;
  isBooked: 'confirmed' | "canceled";
};
