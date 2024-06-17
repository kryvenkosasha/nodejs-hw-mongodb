import { Router } from 'express';
import {
  getAllContacts,
  getContactByID,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

export const ctrlWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContacts));

router.get('/contacts/:contactId', ctrlWrapper(getContactByID));

router.post('/contacts', ctrlWrapper(createContact));

router.patch('/contacts/:contactId', ctrlWrapper(updateContact));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContact));

export default router;
