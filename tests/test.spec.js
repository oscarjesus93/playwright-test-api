import { test, expect } from '@playwright/test';

const URL_COMPLEMENT = '/public/v2';
const EMAIL = 'oscarjesus93@hotmail.com';

test.describe('Test Api Rest GoREST', () => {

    test('Test Api Post', async ({request}) => {
        const payload = {
            name: "Oscar Sanchez",
            email: "oscarjesus93@hotmail.com",
            status: "Active",
            gender: "Male",
        }
        const response = await request.post(`${URL_COMPLEMENT}/users`, {
            data: payload
        });
        
        await expect(response.ok()).toBeTruthy();
        await expect(response.status()).toBe(200);
    })

    test('Test Get Users', async ({ request }) => {
        
        const response = await request.get(`${URL_COMPLEMENT}/users`);
        await expect(response.ok()).toBeTruthy();      
        await expect(response.status()).toBe(200);
    })

    test('Test Get User For Id', async ({request}) => {
        const response = await request.get(`${URL_COMPLEMENT}/users/123307`);
        await expect(response.ok()).toBeTruthy();
        await expect(response.status()).toBe(200);
    })    

    test('Test Put Api', async ({request}) => {
        const response = await request.get(`${URL_COMPLEMENT}/users`, {
            params: {
                email: EMAIL
            }
        })

        await expect(response.ok()).toBeTruthy();
        await expect(response.status()).toBe(200);

        const jsonList = await response.json();

        const user = jsonList.find(j => j.email === EMAIL);

        const result = await request.put(`${URL_COMPLEMENT}/users/${user.id}`, {
            data: {
                name: "Oscar JEsus Sanchez",
                status: "Inactive"
            }
        });

        await expect(result.ok()).toBeTruthy();
        await expect(result.status()).toBe(200);

    })

    test('Test Delete Api', async ({request}) => {
        const response = await request.get(`${URL_COMPLEMENT}/users`, {
            params: {
                email: EMAIL
            }
        })

        await expect(response.ok()).toBeTruthy();
        await expect(response.status()).toBe(200);

        const jsonList = await response.json();

        const user = jsonList.find(j => j.email === EMAIL);

        const result = await request.delete(`${URL_COMPLEMENT}/users/${user.id}`);

        await expect(result.ok()).toBeTruthy();
        await expect(result.status()).toBe(204);

    })

    test('Test Get Not Found', async ({request}) => {

        const response = await request.get(`${URL_COMPLEMENT}/users/124578`);

        await expect(response.ok()).not.toBeTruthy()
        await expect(response.status()).toBe(404);

    })

})