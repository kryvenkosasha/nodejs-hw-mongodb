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

router.get('/', ctrlWrapper(getContactsController));

router.get(
  '/:contactId',
  isValidId(),
  ctrlWrapper(getContactByIDController),
);

router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  validateBody(createContactSchema),
  isValidId(),
  ctrlWrapper(patchContactController),
);

router.delete(
  '/:contactId',
  isValidId(),
  ctrlWrapper(deleteContactController),
);

export default router;
