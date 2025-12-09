export class ApiClient {
  constructor(request) {
    this.request = request;
    this.baseUrl = 'https://restful-booker.herokuapp.com';
  }

  async bookReservation(data) {
    return await this.request.post(`${this.baseUrl}/booking`, { data });
  }

  async verifyReservationDetails(id) {
    return await this.request.get(`${this.baseUrl}/booking/${id}`);
  }

  async updateReservedDetails(id, token, data) {
    return await this.request.put(`${this.baseUrl}/booking/${id}`, {
      data,
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }

  async deleteReservation(id, token) {
    return await this.request.delete(`${this.baseUrl}/booking/${id}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }
}
