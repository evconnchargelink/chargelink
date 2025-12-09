import { Request, Response } from "express";
import asyncHandler from "../../utils/async.handler.js";




export const bookStation = asyncHandler(async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            message: "Booking successful"
        })
    }catch(e){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
});
