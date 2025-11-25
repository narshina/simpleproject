import express from 'express';
import { connectDB } from './utils/db.js';
import userrouter from './Routes/userRoutes.js';

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/user',userrouter)

connectDB().then(() => {
  
  app.listen(5000, () => {
    console.log('✅ Server is running on http://localhost:5000');
  });
});