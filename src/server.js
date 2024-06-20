import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import contactsRouter from './routers/contacts.js';
// import { HttpError } from 'http-errors';
import { errorHandler } from './middleware/errorHandlerMiddleware.js';
import { notFoundHandler } from './middleware/notFoundHandlerMiddleware.js';

const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(pino());

  app.use(contactsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
