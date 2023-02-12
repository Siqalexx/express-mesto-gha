class Forbidden extends Error {
  constructor(text) {
    super(text);
    this.name = 'Forbidden';
    this.status = 403;
  }
}
module.exports = Forbidden;
