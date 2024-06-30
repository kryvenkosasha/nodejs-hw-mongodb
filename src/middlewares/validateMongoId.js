import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  console.log(req);
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(createHttpError(404, 'Not found'));
  }

  next();
};
