import axios from 'axios';

// Function to generate TTS audio
export const generateTTS = async (text: string, voice: string): Promise<Buffer> => {
  try {
    // Example: Call a third-party TTS API (replace with your actual TTS API)
    const response = await axios.post(
      'https://api.example.com/tts',
      { text, voice },
      { responseType: 'arraybuffer' } // Ensure the response is returned as a Buffer
    );

    // Return the audio buffer
    return Buffer.from(response.data);
  } catch (error) {
    console.error('Error generating TTS:', error);
    throw new Error('Failed to generate TTS audio.');
  }
};