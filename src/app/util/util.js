// eslint-disable-next-line consistent-return
const validField = (field, res, statusCode, message) => {
  if (!field) {
    return res.status(statusCode).json(message);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { validField };
