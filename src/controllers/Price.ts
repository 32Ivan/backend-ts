import { NextFunction, Request, Response } from 'express';
import Price from '../models/Price';

const createPrice = (req: Request, res: Response, next: NextFunction) => {
    const { amount, city } = req.body;

    const price = new Price({
        amount,
        city
    });

    return price
        .save()
        .then((price) => res.status(201).json({ price }))
        .catch((error) => res.status(400).json({ error }));
};

const readPrice = (req: Request, res: Response, next: NextFunction) => {
    const city = req.params.city;

    return Price.find({ city })
        .then((price) => (price ? res.status(200).json({ price }) : res.status(400).json({ message: 'Not found' })))
        .catch((error) => res.status(400).json({ error }));
};

const readAllPrice = (req: Request, res: Response, next: NextFunction) => {
    return Price.find()
        .then((price) => res.status(200).json({ price }))
        .catch((error) => res.status(400).json({ error }));
};

const updatePrice = (req: Request, res: Response, next: NextFunction) => {
    const priceId = req.params.priceId;

    return Price.findById(priceId)
        .then((price) => {
            if (price) {
                price.set(req.body);

                return price
                    .save()
                    .then((price) => res.status(201).json({ price }))
                    .catch((error) => res.status(400).json({ error }));
            } else {
                res.status(400).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(400).json({ error }));
};

const deledePrice = (req: Request, res: Response, next: NextFunction) => {
    const priceId = req.params.priceId;

    return Price.findByIdAndDelete(priceId)
        .then((price) => (price ? res.status(200).json({ message: 'deleted' }) : res.status(400).json({ message: 'Not found' })))
        .catch((error) => res.status(400).json({ error }));
};

export default { createPrice, readPrice, readAllPrice, updatePrice, deledePrice };
