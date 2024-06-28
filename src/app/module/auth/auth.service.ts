import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TAuth } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../config";


const createUserIntoDB = async (payload: TUser) => {
  const user = await User.isUserExistsByEmail(payload.email);
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, "This email is already exists");
  }

  const createUser = await User.create(payload);
  const userObject: Partial<TUser> = createUser.toObject();
  delete userObject.password;

  return userObject;
};

const checkLoginUser = async (paylod: TAuth) => {
  const user = await User.isUserExistsByEmail(paylod.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (!(await User.isPasswordMatched(paylod?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password is incorrect");
  }

  const jwtPayload = {
    userId: user.email,
    role: user.role,
  };

  const accesToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string
  );

  const userObject = user.toObject();
  delete userObject.password;
};

export const AuthServices = {
  createUserIntoDB,
};
