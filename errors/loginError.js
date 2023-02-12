class LoginError extends Error {
  constructor(text) {
    super(text);
    this.name = 'loginError';
    this.status = 401;
  }
}
module.exports = LoginError;
