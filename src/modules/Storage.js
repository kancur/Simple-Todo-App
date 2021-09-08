/* eslint-disable class-methods-use-this */
export default class Storage {
  saveDataToLocalStorage(data) {
    if (Object.keys(data).length > 0) {
      this.saveStringified('state', data);
    } else {
      localStorage.removeItem('state');
    }
  }

  getDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem('state'));
  }

  saveCurrentID(id) {
    return localStorage.setItem('currentProjectID', JSON.stringify(id));
  }

  loadCurrentID() {
    return this.loadStringified('currentProjectID');
  }

  saveStringified(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
  }

  loadStringified(name) {
    return JSON.parse(localStorage.getItem(name));
  }
}
