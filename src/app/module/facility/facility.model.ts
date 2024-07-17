import { Schema, model } from "mongoose";
import { FacilityMethods, TFacility } from "./facility.interface";

const facilitySchema = new Schema<TFacility, FacilityMethods>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  location: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

facilitySchema.statics.isFacilityExistsById = async function (id: string) {
  return await this.findOne({ _id: id, isDeleted: false });
};

export const Facility = model<TFacility, FacilityMethods>("Facilitys", facilitySchema);
