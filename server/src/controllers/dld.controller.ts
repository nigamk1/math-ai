import { Request, Response } from 'express';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

export const handleDIDAvatarGeneration = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const audioFilePath = req.file?.path;

    if (!text) {
      return res.status(400).json({ error: 'No text provided for D-ID Avatar generation.' });
    }

    if (!audioFilePath) {
      return res.status(400).json({ error: 'No audio file provided for D-ID Avatar generation.' });
    }

    const apiKey = process.env.DID_API_KEY;
    if (!apiKey) {
      console.error('D-ID API Key is missing.');
      return res.status(500).json({ error: 'Missing D-ID API Key. Please configure it in the environment variables.' });
    }

    console.log('Starting D-ID Avatar generation...');

    const formData = new FormData();
    formData.append('script', JSON.stringify({ type: 'audio', input: text })); // Pass the `text` input correctly
    formData.append('audio', fs.createReadStream(audioFilePath));
    formData.append('avatar_id', 'amy'); // Or use `source_url` for custom avatars

    console.log('Form data prepared. Sending request to D-ID API...');

    // Use Bearer token for Authorization if applicable
    const response = await axios.post('https://api.d-id.com/talks', formData, {
      headers: {
        Authorization: `Bearer ${apiKey}`, // Use Bearer for token-based authentication
        ...formData.getHeaders(),
      },
    });

    console.log('D-ID API response received.');

    try {
      fs.unlinkSync(audioFilePath); // Clean up temporary audio file
      console.log('Temporary audio file deleted.');
    } catch (cleanupError) {
      console.error('Error cleaning up audio file:', cleanupError);
    }

    res.status(200).json({ videoUrl: response.data.result_url });
  } catch (error: any) {
    if (error.response) {
      console.error('D-ID API Error:', error.response.data);
      return res.status(error.response.status || 500).json({
        error: error.response.data.message || 'Failed to generate D-ID Avatar video.',
      });
    } else {
      console.error('Unexpected Error:', error.message);
      return res.status(500).json({ error: 'An unexpected error occurred while generating the video.' });
    }
  }
};