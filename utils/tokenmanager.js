// import { credentials } from './env';
require('dotenv').config();

export class TokenManager {
  constructor(request) {
    this.request = request;
    this.token = null;
    // this.expirytime = 10;
    this.username = process.env.BOOKING_USERNAME;
    this.password = process.env.BOOKING_PASSWORD;
    this.tokenexpirysecs = Number(process.env.TOKEN_EXPIRY_SECS) || 3600;
    this.baseUrl = process.env.BASE_URL;
  }

  async generateToken() {
    const resp = await this.request.post(this.baseUrl, {
      data: {
        username: this.username,
        password: this.password,
      },
    });
    const respBody = await resp.json();
    this.token = respBody.token;
    this.expirytime = Date.now() + this.tokenexpirysecs * 1000;
    // console.log('expiry time is ' + this.expirytime);
    return this.token;
  }

  async getToken() {
    // console.log('token:', this.token, 'expiry:', this.expirytime);

    const now = Date.now();

    // console.log(now);
    // console.log(this.expirytime);

    // Reusing the existing token if not expired
    if (this.token && now < this.expirytime) {
      console.log(' Using existing token');
      return this.token;
    }

    // Else generate a new one
    return await this.generateToken();
  }
}
