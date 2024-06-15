import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { contactsRouter } from './routers/contacts.js';
import { HttpError } from 'http-errors';

const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(pino());

  // app.use('/api', contactRoutes);
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome' });
  });

  app.get(contactsRouter);

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
      status: 404,
    });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong :(',
    data: err.message,
  });
};
export default setupServer;
