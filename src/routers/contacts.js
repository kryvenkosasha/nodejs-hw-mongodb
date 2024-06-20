import { Router } from 'express';
import {
  getContactsController,
  getContactByIDController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
<<<<<<< Updated upstream
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
=======

import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/contacts.js';

export const ctrlWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
>>>>>>> Stashed changes

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIDController));

router.post(
  '/contacts',
  validateBody(createContactController),
  ctrlWrapper(createContactController),
);

router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
