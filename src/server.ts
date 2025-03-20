import express from 'express';
import mongoose from 'mongoose';

import { router } from './routes';

const app = express();

app.use(express.json());
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
