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
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIDController));

router.post(
  '/',
  upload.single('photo'),
  ctrlWrapper(createContactController),
  validateBody(createContactSchema),
);

router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  ctrlWrapper(patchContactController),
  validateBody(updateContactSchema),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
