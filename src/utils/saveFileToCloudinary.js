import { CLOUDINARY } from '../constants/contacts.js';
import cloudinary from 'cloudinary';
import { env } from '../utils/env.js';

cloudinary.v2.config({
  config: true,
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

export const saveToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  return response.secure_url;
};
