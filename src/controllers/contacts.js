import { getAllContacts, getContactByID } from '../services/contacts';
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
  }

  res.status(200).json({
    data: contact,
    message: 'Success',
    status: 200,
  });
};
