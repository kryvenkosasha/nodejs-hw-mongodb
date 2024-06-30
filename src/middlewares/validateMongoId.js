import { isValidObjectId } from 'mongoose';
import { HttpError } from 'http-errors';

export const isValidId = (req, res, next) => {
  console.log(req);
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(404, 'Not found'));
  }

  next();
};
