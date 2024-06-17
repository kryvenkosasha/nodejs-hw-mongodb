import {
  getAllContacts,
  getContactByID,
  createContact,
  deleteContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    data: contacts,
    message: 'Success',
    status: 200,
  });
};

export const getContactByIDController = async (req, res, next) => {
  const contact = await getContactByID();

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    data: contact,
    message: 'Success',
    status: 200,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (res, req, next) => {
  const { contactID } = req.params;
  const result = await createContact(contactID, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};

export const deleteContactController = async (res, req, next) => {
  const { contactID } = req.params;
  const contact = deleteContact(contactID);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).json({
    status: 204,
    message: 'Successfully delete',
  });
};
