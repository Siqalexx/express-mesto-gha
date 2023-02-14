class ValidationError extends Error {
  constructor(text) {
    super(text);
    this.name = 'ValidationError';
    this.status = 400;
  }
}
module.exports = ValidationError;
