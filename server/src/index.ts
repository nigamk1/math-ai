import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.routes'; // import central routes
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// ✅ Mount the centralized routes correctly
app.use(routes);

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An internal server error occurred.' });
});

// Test route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});