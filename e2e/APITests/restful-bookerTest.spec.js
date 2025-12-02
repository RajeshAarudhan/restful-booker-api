import { test, expect } from '@playwright/test';
import { TokenManager } from '../../utils/tokenmanager';
let token;

test.describe.configure({ mode: 'serial' });

test.describe('printing token token1', () => {
  test.beforeAll('Token', async ({ request }) => {
    const tm = new TokenManager(request);
    token = await tm.getToken();
    console.log('Newly generated token : ' + token);
  });

  test('print token1', async ({ request }) => {
    const resp1 = await request.get(
      'https://restful-booker.herokuapp.com/booking/1',
      {
        headers: {
          'Content-type': 'application/json',
        },
      }
    );
    console.log(await resp1.json());
  });
});
