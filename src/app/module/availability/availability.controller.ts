import httpStatus from "http-status";
import { catchAsync } from "../../utilities/catchAsync";
import { sendResponse } from "../../utilities/sendResponse";
import { AvailabilityService } from "./availability.service";

const availability = catchAsync(async(req, res, next)=>{
    console.log(req.query.date)
    const result = await AvailabilityService.checkAvailability(req.query.date as string)
    console.log(result);
    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Availability checked successfully",
        data: result,
      });
})

export const AvailabilityController = {
    availability
}