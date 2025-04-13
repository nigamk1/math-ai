import { Request, Response } from 'express';
import { generateAvatar } from '../services/avatar.service';

// Async handler for avatar requests
export const handleAvatar = async (req: Request, res: Response): Promise<Response | undefined> => {
  const { name, style } = req.body;

  // Validate input
  if (!name || !style) {
    return res.status(400).json({ error: 'Name and style are required.' });
  }

  try {
    // Call the service to generate the avatar
    const avatarURL = await generateAvatar(name, style);

    // Send the avatar URL in the response
    res.status(200).json({ avatar: avatarURL });
  } catch (error) {
    console.error('Error in handleAvatar:', error);
    res.status(500).json({ error: 'Failed to generate avatar.' });
  }
};