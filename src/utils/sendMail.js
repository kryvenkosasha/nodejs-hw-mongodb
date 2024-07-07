import nodemailer from 'nodemailer';
// import { SMTP } from '../constants/contacts.js';
// import { env } from './env.js';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env['SMTP_HOST'],
  port: process.env['SMTP_PORT'],
  auth: {
    user: process.env['SMTP_USER'],
    pass: process.env['SMTP_PASSWORD'],
  },
});
///
export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};
