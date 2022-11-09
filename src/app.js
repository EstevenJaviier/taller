import express from 'express';
import 'dotenv/config';
import routes from './routes';
import { urlencoded, json } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import { notFound, errorHandler, corsOptions } from './middlewares';

const app = express();

// Middlewares
app.use(cors(corsOptions));
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cookieParser());

if (!process.env.NODE_ENV) {
  app.use(morgan('dev'));
}

// Importando y cargando rutas
app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
