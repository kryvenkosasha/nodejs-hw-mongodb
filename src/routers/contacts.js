import { Router } from 'express';
import {
  getContactsController,
  getContactByIDController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/validateMongoId.js';
import { createContactSchema } from '../validation/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get(
  '/contacts/:contactId',
  isValidId(),
  ctrlWrapper(getContactByIDController),
);

router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/contacts/:contactId',
  validateBody(createContactSchema),
  isValidId(),
  ctrlWrapper(patchContactController),
);

router.delete(
  '/contacts/:contactId',
  isValidId(),
  ctrlWrapper(deleteContactController),
);

export default router;
