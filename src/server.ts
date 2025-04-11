import path from 'node:path';

import express from 'express';
import mongoose from 'mongoose';

import { cors } from './middlewares/cors';
import { router } from './router';

const app = express();

app.use(cors);
app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(router);

const initServer = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.info(`🚀 Server is running on port http://localhostt:${port}`);
  });
};

mongoose
  .connect('mongodb://docker:docker@localhost:27017/waiter?authSource=admin')
  .then(() => initServer())
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
