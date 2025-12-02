import { credentials } from './env';

export class TokenManager {
  constructor(request) {
    this.request = request;
    this.token = null;
    this.expirytime = 10;
  }

  async generateToken() {
    const resp = await this.request.post(
      'https://restful-booker.herokuapp.com/auth',
      {
        data: {
          username: credentials.username,
          password: credentials.password,
        },
      }
    );
    const respBody = await resp.json();
    this.token = respBody.token;
    this.expirytime = Date.now() + credentials.tokenexpirysecs * 1000;
    // console.log('expiry time is ' + this.expirytime);
    return this.token;
  }

  async getToken() {
    // console.log('token:', this.token, 'expiry:', this.expirytime);

    const now = Date.now();

    // console.log(now);
    // console.log(this.expirytime);

    // Reusing the existing token if not expired
    if (now < this.expirytime) {
      console.log(' Using existing token');
      return this.token;
    }

    // Else generate a new one
    return await this.generateToken();
  }
}
