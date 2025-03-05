import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://gorest.co.in/public/v2'


test('Validate the users endpoint', async ({}) => {
  const apiContext = await request.newContext();
  const response = await apiContext.get(`${BASE_URL}/users`);
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  responseBody.forEach((user: any) => {
    expect(user).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      email: expect.any(String),
      gender: expect.any(String),
      status: expect.any(String),
    });
    expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(['male', 'female']).toContain(user.gender);
    expect(['active', 'inactive']).toContain(user.status);
  });
  console.log('Response Body:', responseBody);
});

test('Validate the Posts endpoint', async ({}) => {
  const apiContext = await request.newContext();
  const response = await apiContext.get(`${BASE_URL}/posts`);
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  responseBody.forEach((post: any) => {
    expect(post).toMatchObject({
      id: expect.any(Number),
      user_id: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
    });
    expect(post.title.length).toBeGreaterThan(0);
    expect(post.body.length).toBeGreaterThan(0);
  });
  console.log('Response Body:', responseBody);
});


const generateEmail = () => {
  const timestamp = new Date().getTime();
  return `user_${timestamp}@example.com`;
};

test('Create a user with different user each time (Timestamp way)', async ({}) => {
  const apiContext = await request.newContext();
  const userData = {
    name: "John Doe",
    gender: "male",
    email: generateEmail(),
    status: "active"
  };
  const response = await apiContext.post(`${BASE_URL}/users`, {
    data: userData,
    headers: {
      'Content-Type': 'application/json',
      // Access token should be in a scure JSON file, I'm keeping it here just for this test
      'Authorization': 'Bearer a5485650a5fe38bec769c90e3bef5a8716931f723b2929a5d0b5378ee8443d2c'
    }
  });
  expect(response.status()).toBe(201)
  const responseBody = await response.json()
  expect(responseBody).toMatchObject({
    id: expect.any(Number),
    name: userData.name,
    gender: userData.gender,
    email: userData.email,
    status: userData.status
  });
  console.log('User Created:', responseBody)
})


test('Create a post for 7750153 user', async ({}) => {
  const apiContext = await request.newContext();
  const userData = {
    "id":7750153,
    "title": "Hello world!!",
    "status":"completed"
  }
  const response = await apiContext.post(`${BASE_URL}/users/7750153/todos`, {
    data: userData,
    headers: {
      'Content-Type': 'application/json',
      // Access token should be in a scure JSON file, I'm keeping it here just for this test
      'Authorization': 'Bearer a5485650a5fe38bec769c90e3bef5a8716931f723b2929a5d0b5378ee8443d2c'
    }
  });
  expect(response.status()).toBe(201)
  const responseBody = await response.json()
  // better to store the data in a JSON file so we can use it in the next testcase
  expect(typeof responseBody.id).toBe('number');
  expect(typeof responseBody.user_id).toBe('number');
  expect(typeof responseBody.title).toBe('string');
  expect(typeof responseBody.status).toBe('string');
  console.log('User Created:', responseBody)
})