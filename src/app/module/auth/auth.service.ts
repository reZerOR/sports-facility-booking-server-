import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";

const createUserIntoDB = async (payload: TUser) => {
  const user = await User.isUserExistsByEmail(payload.email);
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, "This email is already exists");
  }

  const createUser = await User.create(payload);
  const userObject: Partial<TUser> = createUser.toObject()
  delete userObject.password
  
  return userObject;
};

export const AuthServices = {
  createUserIntoDB,
};
