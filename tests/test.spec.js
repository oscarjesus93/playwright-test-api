import { test, expect, request } from '@playwright/test';

const URL_COMPLEMENT = '/apiacademiaqa/api/v1/';

test.describe('Test Api Rest GoREST', () => {

    test('Api Get One', async ({request}) => {
        const response = await request.get(`${URL_COMPLEMENT}/MenuUser`);
        const json = await response.json();
        console.log(json);
        await expect(response.ok()).toBeTruthy();
        await expect(response.status()).toBe(200);
    })

    test('Api Get Two', async ({request}) => {
        const response = await request.get(`${URL_COMPLEMENT}/glosario`);
        const json = await response.json();
        await expect(Object.keys(json).length).toBeGreaterThanOrEqual(1);
    })

})