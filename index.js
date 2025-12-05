import express from 'express';
import { connectDB } from './utils/db.js';
import cors from 'cors';
import userrouter from './Routes/userRoutes.js';
import router from './Routes/InvoiceRoute.js';
import productrouter from './Routes/productRoutes.js';

const app = express();
app.use(express.json());
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/user',userrouter)
app.use('/invoice',router)  
app.use('/product',productrouter)

connectDB().then(() => {
  
  app.listen(5000, () => {
    console.log('✅ Server is running on http://localhost:5000');
  });
});