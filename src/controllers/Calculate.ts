import { NextFunction, Request, Response } from "express";
import Discount from "../models/Discount";
import Price from "../models/Price";

const readCalculator = async (req: Request, res: Response, next: NextFunction) => {
    const city = req.params.city;
    const dateOfBirth = req.params.date;

    const dob = new Date(dateOfBirth);
    const date = new Date();

    const year = date.getFullYear() - dob.getFullYear();

    try {
        const discounts = await Discount.find({ ageMin: { $lte: year }, ageMax: { $gte: year } }).exec();
        if (discounts.length === 0) {
            return res.status(400).json({ message: "No applicable discount found for the given age." });
        }

        const prices = await Price.find({ city }).exec();
        if (prices.length === 0) {
            return res.status(400).json({ message: "No price found for the given city." });
        }

        const discount = discounts[0];
        const price = prices[0];
        const calculate = price.amount * (1 - discount.discount / 100);

        return res.status(200).json({ calculate });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong." });
    }
};

export default { readCalculator };
