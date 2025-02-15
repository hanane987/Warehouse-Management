import axios from 'axios';

const API_URL = 'http://localhost:3002/users'; // Your backend API URL

// Authenticate user by checking username and secretCode
export const authenticateUser = async (username, secretCode) => {
  try {
    // Make a GET request to check if the username and secretCode match
    const response = await axios.get(API_URL, {
      params: {
        username,
        secretCode
      }
    });

    // If the user exists, return the user data
    if (response.data.length > 0) {
      return response.data[0];
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Authentication failed');
  }
};
