import contactColection from '../db/Contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
// import { SORT_ORDER } from '../constants/contacts.js';

export const getAllContacts = async ({
  userId,
  page,
  perPage,
  sortOrder,
  sortBy,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = contactColection.find({ userId });

  const contactsCount = await contactColection
    .find({ userId })
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .merge(contactsQuery)
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

export const getContactByID = async (contactId, userId) => {
  const contact = await contactColection.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await contactColection.create(payload);
  return contact;
};

export const updateContact = async (userId, contactId, payload) => {
  const rawResult = await contactColection.findOneAndUpdate(
    {
      _id: contactId,
      userId: userId,
    },
    payload,
    {
      new: true,
      includeResultMetadata: true,
    },
  );
  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (userId, contactId) => {
  const contact = await contactColection.findOneAndDelete({
    _id: contactId,
    userId: userId,
  });
  return contact;
};
