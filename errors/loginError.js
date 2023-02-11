class loginError extends Error {
  constructor(text) {
    super(text);
    this.name = 'notFound';
    this.status = 401;
  }
}
module.exports = loginError;
