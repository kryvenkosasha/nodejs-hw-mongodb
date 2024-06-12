import contactColection from '../db/Contacts.js';

export const getAllContacts = async () => {
  const contacts = await contactColection.find();
  return contacts;
};

export const getContactByID = async (contactID) => {
  const contact = await contactColection.findById(contactID);
  return contact;
};
