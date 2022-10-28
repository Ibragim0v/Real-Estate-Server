import dotenv from 'dotenv';
import express, { Application, Request, Response, response } from 'express';
import cors from 'cors';
import { dataSource } from './config/ormconfig';
import { errorHandler } from './middlewares/errorHandler.middleware';
import router from './routes/routes';
dotenv.config();
const app: Application = express();
const PORT: number | string = process.env.PORT || 9090;

dataSource
  .initialize()
  .then(() => console.log('Connected to database'))
  .catch((err) =>
    response.json({
      status: 503,
      message: err.message,
    }),
  );

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler);
app.use('/*', (_: Request, res: Response) =>
  res.status(404).json({
    status: 404,
    message: 'The page you are looking for does not exist',
  }),
);

app.listen(PORT, (): void => {
  console.info({
    port: PORT,
    message: 'Server is running...',
  });
});
