import { Model } from "mongoose";

export interface TUser{
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  address: string;
};


export interface UserMethods extends Model<TUser>{
    //instance methods for checking if the user exist
    isUserExistsByEmail(email: string): Promise<TUser>;
}