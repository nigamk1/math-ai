import { Request, Response } from 'express';
import { generateExplanation } from '../services/openai.service';

// Async handler for the explain endpoint
export const handleExplain = async (req: Request, res: Response): Promise<Response | undefined> => {
  const { topic, style } = req.body;

  // Validate the request body
  if (!topic || !style) {
    return res.status(400).json({ error: 'Topic and style are required.' });
  }

  try {
    // Generate the explanation using the OpenAI service
    const explanation = await generateExplanation(topic, style);
    return res.status(200).json({ explanation });
  } catch (error: any) {
    console.error('Error in handleExplain:', error);

    // Handle rate limiting or quota errors
    if (
      error.message.includes('Rate limit exceeded') ||
      error.message.includes('insufficient quota')
    ) {
      return res.status(429).json({ error: error.message });
    }

    // Handle other errors
    return res.status(500).json({ error: 'Failed to generate explanation.' });
  }
};