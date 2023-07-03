export default class Storage {
  static saveUsers(data) {
    localStorage.setItem("users", JSON.stringify(data));
  }

  static getUsers() {
    return JSON.parse(localStorage.getItem("users"));
  }
}
