import { Router } from 'express';
import {
  getAllContacts,
  getContactByID,
  createContactController,
} from '../services/contacts';

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

router.post('/contacts', ctrlWrapper(createContactController));

export default router;
