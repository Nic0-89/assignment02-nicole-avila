// import { test, expect } from '@playwright/test';
// //import { faker } from '@faker-js/faker';
// //import { title } from 'process';

// test.describe('Test suite backend', () => {
//   let token = ''; 
//   let loginResponse: any;

//   test('Test case 01 - Log into app POST', async ({ request }) => {
//     loginResponse = await request.post('http://localhost:3000/api/login', {
//       data: {
//         username: 'tester01',
//         password: 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c',
//       },
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })

//     expect(loginResponse.status()).toBe(200);
//     const responseInfo = await loginResponse.json();
   
//     expect(responseInfo).toHaveProperty('token');
//     expect (responseInfo.token).toBeTruthy()
//     token = responseInfo.token; // Set the token for use in the next test
//     console.log(await loginResponse.text());
//   });
//   test('Test case 02 - Login Fail', async ({ request }) => {
//     loginResponse = await request.post('http://localhost:3000/api/login', {
//       data: {
//         username: 'tester01',
//         password: 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c',
//       },
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })

//     expect(loginResponse.status()).toBe(200);
//     const responseInfo = await loginResponse.json();
   
//     expect(responseInfo).toHaveProperty('token');
//     expect (responseInfo.token).toBeTruthy()
//     token = responseInfo.token; // Set the token for use in the next test
//     console.log(await loginResponse.text());
//   });

//   test('Test case 03 - Get all clients', async ({ request }) => {
//     // has the token been saved?
//     expect(token).toBeTruthy(); // to check if token is set

//     const response = await request.get('http://localhost:3000/clients', {
//       headers: {
//         'Content-Type': 'application/json',
//         'X-user-auth': JSON.stringify({
//           username: 'tester01', // You may want to use the username from the login response
//           token: token,
//         }),
//       },
//     });
//     expect(response.ok()).toBeTruthy();
//     expect(response.status()).toBe(200);
//     const responseBody = JSON.parse(await response.text());
//     expect (responseBody).toHaveProperty('name');
//   });
// });