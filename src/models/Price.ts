import mongoose, { Document, Schema } from 'mongoose';

export interface IPrice {
    amount: number;
    city: string;
}

export interface IPriceModel extends IPrice, Document {}

const PriceSchema: Schema = new Schema(
    {
        amount: { type: Number, required: true },
        city: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IPriceModel>('Price', PriceSchema);
