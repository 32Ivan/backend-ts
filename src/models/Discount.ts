import mongoose, { Document, Schema } from 'mongoose';

export interface IDiscount {
    discount: number;
    ageMin: number;
    ageMax: number;
}

export interface IDiscountModel extends IDiscount, Document {}

const DiscountSchema: Schema = new Schema(
    {
        discount: { type: Number, required: true },
        ageMin: { type: Number, required: true },
        ageMax: { type: Number, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IDiscountModel>('Discount', DiscountSchema);
