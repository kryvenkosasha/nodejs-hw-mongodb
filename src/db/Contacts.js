// import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    userId: {
      type: String,
      ref: 'UsersCollection', 
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const contactColection = model('contacts', contactSchema);

export default contactColection;
