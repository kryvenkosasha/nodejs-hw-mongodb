import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getAllContacts, getContactByID } from './services/contacts.js';

const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(pino());

  // app.use('/api', contactRoutes);
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome' });
  });

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();

      res.status(200).json({
        message: 'success',
        status: 200,
        data: contacts,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Internal Server Error',
        status: 500,
      });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const contact = await getContactByID(req.params.contactId);
      if (!contact) {
        return res.status(404).json({
          message: 'Contact not found',
          status: 404,
        });
      }
      res.status(200).json({
        message: `Found contact with id ${req.params.contactId}!`,
        status: 200,
        data: contact,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        status: 500,
        error: error,
      });
    }
  });

  app.get('*', (req, res) => {
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

export default setupServer;
