import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

const PORT = 3000;
const MONGODB_USER = 'sashakryvenko2006';
const MONGODB_PASSWORD = 'LNOSj6mZiznX7kUk';
const MONGODB_URL = 'cluster0.033qwcj.mongodb.net';
const MONGODB_DB = 'contacts';

// const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;

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
