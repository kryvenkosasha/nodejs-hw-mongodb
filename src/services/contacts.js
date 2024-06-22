import contactColection from '../db/Contacts.js';
// import createHttpError from 'http-errors';

export const getAllContacts = async () => {
  const contacts = await contactColection.find();
  return contacts;
};

export const getContactByID = async (contactID) => {
  const contact = await contactColection.findById(contactID);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await contactColection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload) => {
  const rawResult = await contactColection.findOneAndUpdate(
    { _id: contactId },
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

export const deleteContact = async (contactId) => {
  const contact = await contactColection.findByIdAndDelete({ _id: contactId });
  console.log(contact);
  return contact;
};
