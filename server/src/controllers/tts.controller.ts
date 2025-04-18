import { Request, Response } from 'express';
import axios from 'axios';

export const handleTTS = async (req: Request, res: Response) => {
  try {
    const { text, voiceId } = req.body;

    // Validate input text
    if (!text) {
      return res.status(400).json({ error: 'No text provided for TTS.' });
    }

    if (text.length > 500) { // Example character limit for ElevenLabs
      return res.status(400).json({ error: 'Text exceeds the maximum character limit for TTS (500 characters).' });
    }

    // Validate API Key
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      console.error('ElevenLabs API Key is missing.');
      return res.status(500).json({ error: 'Missing ElevenLabs API Key. Please configure it in the environment variables.' });
    }

    // Validate or fetch voice ID
    let voice = voiceId;
    if (!voiceId) {
      console.warn('No voiceId provided. Fetching the first available voice.');
      const voicesResponse = await axios.get('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'xi-api-key': apiKey,
        },
      });

      const voices = voicesResponse.data.voices;
      if (!voices || voices.length === 0) {
        console.error('No voices are available on your ElevenLabs account.');
        return res.status(500).json({ error: 'No voices available on ElevenLabs account.' });
      }

      voice = voices[0].voice_id; // Default to the first available voice
    }

    // Call the ElevenLabs Text-to-Speech API
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice}`,
      {
        text,
        voiceSettings: {
          stability: 0.75, // Optional, adjust for your use case
          similarity_boost: 0.75, // Optional, adjust for your use case
        },
      },
      {
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer', // Expect binary data (audio)
      }
    );

    // Send the audio file as the response
    res.set('Content-Type', 'audio/mpeg');
    res.send(response.data);
  } catch (error: any) {
    // Enhanced error handling with decoded error response
    if (error.response) {
      const errorData = Buffer.isBuffer(error.response.data)
        ? JSON.parse(error.response.data.toString('utf-8'))
        : error.response.data;

      console.error('API Response Error:', errorData);
      const errorMessage = errorData?.detail?.message || 'Failed to generate TTS audio.';
      return res.status(error.response.status || 500).json({ error: errorMessage });
    } else {
      console.error('Error generating TTS audio:', error.message);
      return res.status(500).json({ error: 'An unexpected error occurred while generating TTS audio.' });
    }
  }
};