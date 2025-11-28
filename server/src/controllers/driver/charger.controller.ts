import { Request, Response } from "express";
import asyncHandler from "../../utils/async.handler";




export const nearestChargers = asyncHandler(async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            message: "Nearest Chargers"
        })
    }catch(e){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
});