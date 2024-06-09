import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import dotenv from 'dotenv';

const setupServer = () => {
  const app = express();

  app.use(cors());

  const logger = pino();
  app.use(pinoHttp({ logger }));

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Route not found',
    });
  });

  const PORT = Number(process.env.PORT);
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export default setupServer;
