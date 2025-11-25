import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';
import serverless from "serverless-http";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running successfully',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/health`);
});

export default serverless(app);