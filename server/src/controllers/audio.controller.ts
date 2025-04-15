import { Request, Response } from 'express';
import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your OpenAI API key is set in the .env file
});

export const handleAudioUpload = async (req: Request, res: Response) => {
  try {
    const audioFile = req.file;

    if (!audioFile) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    // Ensure the temp directory exists
    const tempDir = path.join(__dirname, '../../temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Save the uploaded file temporarily
    const tempFilePath = path.join(tempDir, `temp_audio_${Date.now()}.webm`);
    fs.writeFileSync(tempFilePath, audioFile.buffer);

    // Transcribe the audio using OpenAI Whisper API
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(tempFilePath),
      model: 'whisper-1',
      response_format: 'json',
    });

    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);

    res.json({ transcription: transcription.text });
  } catch (error: any) {
    console.error('Error during transcription:', error.message);
    res.status(500).json({ error: 'Failed to transcribe audio' });
  }
};