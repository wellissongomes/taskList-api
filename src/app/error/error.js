// TODO: add default message: 'User is not logged in.'
class UnauthorizedError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    this.status = 401;
  }

  statusCode() {
    return this.status;
  }
}

export default UnauthorizedError;
