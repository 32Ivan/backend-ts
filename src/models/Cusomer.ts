import mongoose, { Document, Schema } from 'mongoose';

export interface ICustomer {
    name: string;
    surname: string;
    email: string;
    city: string;
    dateOfBirth: Date;
}

export interface ICustomerModel extends ICustomer, Document {}

const CustomerSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        email: { type: String, required: true },
        city: { type: String, required: true },
        dateOfBirth: { type: Date, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<ICustomerModel>('Customer', CustomerSchema);
