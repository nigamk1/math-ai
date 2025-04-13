import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.routes';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// ✅ Using the centralized routes correctly
app.use(cors());
app.use(routes);
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An internal server error occurred.' });
});

app.get('/', (req, res) => {
  res.send('Server is running...');
});

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
