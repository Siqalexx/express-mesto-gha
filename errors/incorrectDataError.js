class incorrectData extends Error {
  constructor(text) {
    super(text);
    this.name = "incorrectData";
    this.status = 400;
  }
}
module.exports = incorrectData; //не нужен класс, тк есть уже готовый
