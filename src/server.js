import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandlerMiddleware.js';
import { notFoundHandler } from './middlewares/notFoundHandlerMiddleware.js';

const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(pino());

  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
