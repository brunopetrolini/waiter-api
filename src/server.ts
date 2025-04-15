/* eslint-disable @typescript-eslint/no-misused-promises */
import http from 'node:http';
import path from 'node:path';

import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import { cors } from './middlewares/cors';
import { router } from './router';

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors);
app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(router);

const initServer = () => {
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.info(`🚀 Server is running on port http://localhost:${port}`);
  });
};

mongoose
  .connect('mongodb://docker:docker@localhost:27017/waiter?authSource=admin')
  .then(() => initServer())
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
