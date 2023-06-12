import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import authRouter from './routes/auth';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "hello" });
});

app.use('/api', protect, router)
app.use('/auth', authRouter)


export default app
