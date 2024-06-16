import contactColection from '../db/Contacts.js';

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
