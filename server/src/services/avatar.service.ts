import axios from 'axios';

// Function to generate an avatar
export const generateAvatar = async (name: string, style: string): Promise<string> => {
  try {
    // Example: Call a third-party avatar API (replace with your actual avatar API)
    const response = await axios.get(
      `https://api.example.com/avatar`,
      {
        params: { name, style },
      }
    );

    // Return the avatar URL from the API response
    return response.data.avatarURL; // Adjust based on the API response structure
  } catch (error) {
    console.error('Error generating avatar:', error);
    throw new Error('Failed to generate avatar.');
  }
};