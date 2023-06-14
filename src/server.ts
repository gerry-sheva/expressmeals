import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import authRouter from './routes/auth';
import { deliveringStatus } from './handlers/rider';
import { calculateDistance } from './utils/maps';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.get("/", async (req, res) => {
  const distance = await calculateDistance()
  console.log(distance)
  res.status(200);
  res.json({ data: distance });
});

app.use('/api', protect, router)
app.use('/auth', authRouter)
app.put('/rider/order/:id', deliveringStatus)


export default app
