import { NextFunction, Request, Response } from "express";
import Discount from "../models/Discount";

const createDiscount = (req: Request, res: Response, next: NextFunction) => {
    const { discount, ageMin, ageMax } = req.body;

    const discounts = new Discount({
        discount,
        ageMin,
        ageMax
    });

    return discounts
        .save()
        .then((discounts) => res.status(201).json({ discounts }))
        .catch((error) => res.status(400).json({ error }));
};

const readDiscount = async (req: Request, res: Response, next: NextFunction) => {
    const dateOfBirth = req.params.age;

    const dob = new Date(dateOfBirth);
    const date = new Date();

    const year = date.getFullYear() - dob.getFullYear();

    try {
        const discounts = await Discount.find({ ageMin: { $lte: year }, ageMax: { $gte: year } }).exec();
        if (discounts.length === 0) {
            return res.status(400).json({ message: "No applicable discount found for the given age." });
        }

        const discount = discounts[0];
        const final = discount.discount;

        return res.status(200).json({ final });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong." });
    }
};

const readAllDiscount = (req: Request, res: Response, next: NextFunction) => {
    return Discount.find()
        .then((discounts) => res.status(200).json({ discounts }))
        .catch((error) => res.status(400).json({ error }));
};

const updateDiscount = (req: Request, res: Response, next: NextFunction) => {
    const discountId = req.params.discountId;

    return Discount.findById(discountId)
        .then((discounts) => {
            if (discounts) {
                discounts.set(req.body);

                return discounts
                    .save()
                    .then((discounts) => res.status(201).json({ discounts }))
                    .catch((error) => res.status(400).json({ error }));
            } else {
                res.status(400).json({ message: "Not found" });
            }
        })
        .catch((error) => res.status(400).json({ error }));
};

const deledeDiscount = (req: Request, res: Response, next: NextFunction) => {
    const discountId = req.params.discountId;

    return Discount.findByIdAndDelete(discountId)
        .then((discounts) => (discounts ? res.status(200).json({ message: "deleted" }) : res.status(400).json({ message: "Not found" })))
        .catch((error) => res.status(400).json({ error }));
};

export default { createDiscount, readDiscount, readAllDiscount, updateDiscount, deledeDiscount };
