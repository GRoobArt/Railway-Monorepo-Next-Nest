'use server';

export async function getUsers() {
  const baseUrl = process.env.API_URL;
  const url = `${baseUrl}/v1/users`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Users fetched');

      return response.json();
    } else {
      throw new Error(`Error getting users: ${response.statusText}`);
    }
  } catch (e) {
    console.error(`Error getting users: ${e}`);
    throw new Error(`Error getting users: ${e}`);
  }
}
