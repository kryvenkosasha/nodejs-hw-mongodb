import contactColection from '../db/Contacts.js';
import createHttpError from 'http-errors';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
// import { SORT_ORDER } from '../constants/contacts.js';

export const getAllContacts = async ({ page, perPage, sortOrder, sortBy }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = contactColection.find();

  const contactsCount = await contactColection
    .find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactByID = async (contactID) => {
  const contact = await contactColection.findById(contactID);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await contactColection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, next) => {
  const rawResult = await contactColection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
    },
  );
  if (!rawResult) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId) => {
  const contact = await contactColection.findByIdAndDelete({ _id: contactId });
  console.log(contact);
  return contact;
};
