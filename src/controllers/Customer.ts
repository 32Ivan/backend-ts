import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Cusomer from "../models/Cusomer";

const createCustomer = (req: Request, res: Response, next: NextFunction) => {
    const { name, surname, email, city, dateOfBirth } = req.body;

    const customer = new Cusomer({
        _id: new mongoose.Types.ObjectId(),
        name,
        surname,
        email,
        city,
        dateOfBirth
    });

    return customer
        .save()
        .then((customer) => res.status(201).json({ customer }))
        .catch((error) => res.status(400).json({ error }));
};

const readCustomer = (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.params.customerId;

    return Cusomer.findById(customerId)
        .then((customer) => (customer ? res.status(200).json({ customer }) : res.status(400).json({ message: "Not found" })))
        .catch((error) => res.status(400).json({ error }));
};

const readAllCustomers = (req: Request, res: Response, next: NextFunction) => {
    return Cusomer.find()
        .then((customers) => res.status(200).json({ customers }))
        .catch((error) => res.status(400).json({ error }));
};

const updateCustomer = (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.params.customerId;

    return Cusomer.findById(customerId)
        .then((customer) => {
            if (customer) {
                customer.set(req.body);

                return customer
                    .save()
                    .then((customer) => res.status(201).json({ customer }))
                    .catch((error) => res.status(400).json({ error }));
            } else {
                res.status(400).json({ message: "Not found" });
            }
        })
        .catch((error) => res.status(400).json({ error }));
};

const deledeCustomer = (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.params.customerId;

    return Cusomer.findByIdAndDelete(customerId)
        .then((customer) => (customer ? res.status(200).json({ message: "deleted" }) : res.status(400).json({ message: "Not found" })))
        .catch((error) => res.status(400).json({ error }));
};

export default { createCustomer, readCustomer, readAllCustomers, updateCustomer, deledeCustomer };
