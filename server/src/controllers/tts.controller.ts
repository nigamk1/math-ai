import { Request, Response } from 'express';
import { generateTTS } from '../services/tts.service';

// Async handler for TTS requests
export const handleTTS = async (req: Request, res: Response): Promise<Response | undefined> => {
  const { text, voice } = req.body;

  // Validate input
  if (!text || !voice) {
    return res.status(400).json({ error: 'Text and voice are required.' });
  }

  try {
    // Call the service to generate TTS audio
    const audioBuffer = await generateTTS(text, voice);

    // Send the audio file in the response
    res.setHeader('Content-Type', 'audio/mpeg');
    res.status(200).send(audioBuffer);
  } catch (error) {
    console.error('Error in handleTTS:', error);
    res.status(500).json({ error: 'Failed to generate TTS audio.' });
  }
};