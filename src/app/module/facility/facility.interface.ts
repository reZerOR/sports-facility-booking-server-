import { Model } from "mongoose";

export type TFacility = {
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  isDeleted: boolean;
};

export interface FacilityMethods extends Model<TFacility> {
  isFacilityExistsById(id: string): Promise<TFacility>;
}