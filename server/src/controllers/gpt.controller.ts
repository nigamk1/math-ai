import { Request, Response } from 'express';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your OpenAI API key is set
});

export const handleGPTResponse = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'No text provided for GPT response generation' });
    }

    // Generate a response using GPT-3.5
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Use the desired GPT model
      messages: [
        { role: 'system', content: 'You are a helpful AI teacher that explains concepts to students.' },
        { role: 'user', content: text },
      ],
      max_tokens: 300, // Adjust as needed
    });

    const gptResponse = completion.choices[0].message?.content || 'No response generated';

    res.json({ response: gptResponse });
  } catch (error: any) {
    console.error('Error generating GPT response:', error.message);
    res.status(500).json({ error: 'Failed to generate GPT response' });
  }
};