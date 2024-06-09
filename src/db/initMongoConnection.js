import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();



const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;

const initMongoConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Error establishing MongoDB connection:', error);
  }
};

export default initMongoConnection;
