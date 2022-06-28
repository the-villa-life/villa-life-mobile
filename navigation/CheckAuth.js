class CheckAuth {
  constructor() {
    this.auth = false;
  }

  async checkLogin() {
    let data = await fetch('http://localhost:4000/auth', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('authorization'),,
      },,
    });;
    return data.json();
  }

  logout(cb) {
    localStorage.removeItem('authenticated');;
    this.auth = false;
    cb();
  }

  async isAuthenticated() {
    const data = await this.checkLogin();;
    return data;
  }
}

export default new CheckAuth();
