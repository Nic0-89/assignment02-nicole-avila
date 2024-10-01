import { test, expect } from '@playwright/test'
import { Console } from 'console';
//import { createToken } from '../server/helper';
const BASE_URL = 'http://localhost:3000/';


test.describe('Test suite backend V1', () => {
  let tokenValue: string 
  test.beforeEach('Test case 01 - Login ', async ({ request }) => {
   
    const responseLoging = await request.post("http://localhost:3000/api/login", {
      data: {
        username: "tester01",
        password: "GteteqbQQgSr88SwNExUQv2ydb7xuf8c"
      }
    });
    const responseBody = await responseLoging.json();
    tokenValue = responseBody.token;
    console.log(tokenValue)
  });

  test('Test case 02 - Get all rooms', async ({ request }) => {
    expect(tokenValue).toBeTruthy();
    const getPostsResponse = await request.get('http://localhost:3000/api/rooms',{
    headers:{
      'X-user-auth': JSON.stringify({
        username: 'tester01',
        token : tokenValue
      }),
      'Content-Type': 'application/json'
    },
  
  });


    expect(getPostsResponse.status()).toBe(200);
    expect(getPostsResponse.ok()).toBeTruthy();
    
    const rooms = (await getPostsResponse.json())
    console.log(rooms)
});



  // 1. Create a New Room (POST)
  // Description: Test the functionality of creating a new room with valid data.
  // Send a POST request to create a room with valid data 
  // Verify the status code is 201 Created.

  test('Test case 03 - Create room with POST', async ({ request }) => {

    var getPostsResponse = await request.post('http://localhost:3000/api/room/new', {
      headers: {
        'X-user-auth': JSON.stringify({
          username: 'tester01',
          token : tokenValue
        }),
        'Content-Type': 'application/json'
      },
      data:{ features: ['balcony'],
      category: 'single',
      number: '4',
      floor: '5',
      available: true,
      price: 2000
      }
    });
    expect(getPostsResponse.status()).toBe(201);
    const room = await getPostsResponse.json();
    expect(room).toHaveProperty('floor');
  });

  test('Test case 04 - Get all rooms', async ({ request }) => {

    var getRoomsResponse = await request.get('http://localhost:3000/api/rooms', {
      headers: {
        'X-user-auth': JSON.stringify({
          username: 'tester01',
          token : tokenValue
        }),
        'Content-Type': 'application/json'
      },
    });
    expect(getRoomsResponse.status()).toBe(200);
    const rooms = await getRoomsResponse.json();
    expect(rooms).toBeTruthy();
  });

// 2. Create a New Client (POST)
// Send a POST request to add a new client with valid data (e.g., name, email, phone number).
// Verify that the status code is 201 Created.

test('Test case 05 - Create Client with POST', async ({ request }) => {
  const newClient = {
    name: "John Doe",           // Replace with actual client data
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Elm Street",
  };
  var getclientResponse = await request.post('http://localhost:3000/api/client/new', {
    headers: {
      'X-user-auth': JSON.stringify({
        username: 'tester01',
        token : tokenValue
      }),
      'Content-Type': 'application/json'
    },
   data: JSON.stringify(newClient),
  });
  expect(getclientResponse.status()).toBe(201); 
  let getclient = await getclientResponse.json()
  expect(getclient).toHaveProperty('name');
});
});


// 3. Create a New Reservation (POST)
// Steps:
// Send a POST request to create a reservation with valid room and client IDs and booking details (e.g., check-in/check-out dates).
// Verify the status code is 201 Created.

// 4. Edit Room Details (PUT)
// Send a PUT request to update the room's details (e.g., modify price).
// Verify the status code is 200 OK.

// 5. Edit Client Information (PUT)
// Send a PUT request to update the client's information.
// Verify the status code is 200 OK.
// Fetch the client info and verify the update.

// 6. Delete a Reservation (DELETE)
// Send a DELETE request to remove a reservation.
// Verify the status code is 204 No Content.

// 7. Create a New Bill (POST)
// Send a POST request to create a bill linked to a specific client and reservation.
// Verify the status code is 201 Created.

// 8. Fetch All Clients (GET)
// Description: Test fetching a list of all clients.
// Preconditions: Clients should exist.
// Steps:
// Send a GET request to retrieve the list of clients.
// Verify the status code is 200 OK.
// Verify that the response contains the list of clients, including those created earlier.
// Expected Result: All clients are fetched successfully, and the data matches what's in the database.

// 9. Invalid Data for Creating a Room (POST)
// Description: Test creating a new room with invalid or missing data (e.g., missing price).
// Preconditions: None.
// Steps:
// Send a POST request to create a room but omit or provide invalid data (e.g., no price or negative price).
// Verify the status code is 400 Bad Request.
// Verify the error message or validation response.
// Expected Result: Room creation fails, and an appropriate error message is returned.

// 10. Delete a Client (DELETE)
// Description: Test deleting a client.
// Preconditions: Client already exists.
// Steps:
// Send a DELETE request to remove a client.
// Verify the status code is 204 No Content.
// Confirm that the client has been deleted by trying to fetch it again (status 404).
// Expected Result: Client is successfully deleted and cannot be retrieved afterward.


