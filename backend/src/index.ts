import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import graphRoutes from './routes/graphs'; 

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/graphs', graphRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Backend is working with TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});