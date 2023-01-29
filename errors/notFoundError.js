class notFound extends Error {
  constructor(text) {
    super(text);
    this.name = "notFound";
    this.status = 404;
  }
}
module.exports = notFound;
