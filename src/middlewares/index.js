import { ValidationError } from 'sequelize';
import { FacebookApiException } from 'fb';

const allowedOrigins = ['http://localhost:4200'];

export const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (process.env.NODE_ENV === 'development' || !origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

export const notFound = (req, res) => {
  return res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
};

export const errorHandler = (error, _req, res, _next) => {
  if (error instanceof FacebookApiException) {
    const err = JSON.parse(error.message);
    return res.status(401).json({ message: err.error.message });
  }

  if (error instanceof ValidationError) {
    const message = error?.errors[0]?.message || error?.message;
    return res.status(409).json({ message });
  }

  const { message, stack } = error;
  const status = res.statusCode === 200 ? 500 : res.statusCode;

  return res.status(status).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '💢' : stack
  });
};
