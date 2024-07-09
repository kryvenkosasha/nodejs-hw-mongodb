import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandlerMiddleware.js';
import { notFoundHandler } from './middlewares/notFoundHandlerMiddleware.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/contacts.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(pino());

  app.use(cookieParser());
  
  app.use(router);

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use('/api-docs', swaggerDocs());

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
