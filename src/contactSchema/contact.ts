import mongoose, { Document, Model, Schema } from "mongoose";

// Define an interface for the contact document
interface IContact extends Document {
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

// Create the contact schema
const contactSchema: Schema<IContact> = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Create the "Contacts" model
const Contacts: Model<IContact> = mongoose.models.Contacts || mongoose.model<IContact>("Contacts", contactSchema);

export default Contacts;
