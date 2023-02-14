class Conflict extends Error {
  constructor(text) {
    super(text);
    this.name = 'Conflict';
    this.status = 409;
  }
}
module.exports = Conflict;
