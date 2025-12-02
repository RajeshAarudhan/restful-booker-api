const { test, expect } = require('@playwright/test');

import { ApiClient } from '../../utils/apiClient';
import { TokenManager } from '../../utils/tokenmanager';
import { schemaCheck } from '../../utils/schemaCheck';

const bookingData = require('../../data/bookingData.json');
const expectedSchema = require('../../data/schema');

let token;

test.describe('E2E Flow On Restful-Booker API', () => {
  test.skip('Create → Get → Update → Delete Booking', async ({ request }) => {
    const api = new ApiClient(request);

    const tm = new TokenManager(request);

    token = await tm.getToken();
    console.log('Newly generated token : ' + token);

    // Booking a room
    const createRes = await api.createBooking(bookingData.newBookingDetails);
    expect(createRes.ok()).toBeTruthy();

    // const { bookingid } = await createRes.json();
    const bookingResp = await createRes.json();
    const { bookingid } = await bookingResp;
    console.log('Booking Id is : ' + bookingid);
    expect(bookingid).toBeTruthy();

    console.log(bookingResp);

    // Verify the booked details
    const getRes = await api.viewBookedDetails(bookingid);
    expect(getRes.ok()).toBeTruthy();
    const getResp = await getRes.json();
    console.log('Get response : ', getResp);

    const bookedResp = await getRes.json();
    expect(bookedResp).toMatchObject(bookingData.newBookingDetails);
    schemaCheck(bookedResp, expectedSchema);

    //Update already booked details
    const updateRes = await api.updateBookedDetails(
      bookingid,
      token,
      bookingData.updateBookingDetails
    );
    expect(updateRes.ok()).toBeTruthy();

    const updated = await updateRes.json();
    console.log('Updated response :', updated);
    expect(updated.lastname).toBe(bookingData.updateBookingDetails.lastname);
    console.log('Updated response :', updated);

    // Verify the booked details after updating
    const newUpdate = await api.viewBookedDetails(bookingid);
    expect(newUpdate.ok()).toBeTruthy();
    const newUpdatedResp = await newUpdate.json();
    console.log('New Updated response : ', newUpdatedResp);

    // const bookedResp = await getRes.json();
    expect(newUpdatedResp.firstname).toBe(
      bookingData.newBookingDetails.firstname
    );
    schemaCheck(newUpdatedResp, expectedSchema);

    // 5. Delete Booking
    const deleteRes = await api.deleteBooking(bookingid, token);
    expect(deleteRes.status()).toBe(201);

    // 6. Verify and confirm the Deletion
    const confirm = await api.viewBookedDetails(bookingid);
    expect(confirm.status()).toBe(404);
  });

  test('Negative scenario - without token', async ({ request }) => {
    const api = new ApiClient(request);
    const create = await api.createBooking(bookingData.newBookingDetails);
    const { bookingid } = await create.json();

    const update = await request.put(`${api.baseUrl}/booking/${bookingid}`, {
      data: bookingData.updateBookingDetails,
    });

    expect(update.status()).toBe(403);
  });
});
