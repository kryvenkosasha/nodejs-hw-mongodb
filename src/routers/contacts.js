import { Router } from 'express';
import { getAllContacts, getContactByID } from '../services/contacts';

const router = Router();

router.get('/contacts', async (req, res) => {
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

router.get('/contacts/:contactId', async (req, res) => {
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

export default router;
