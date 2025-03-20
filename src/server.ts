import fastify, { FastifyPluginOptions } from 'fastify';
import mongoose from 'mongoose';

import { categoriesRoutes, productsRoutes } from './routes';

const app = fastify({ logger: true });

const options: FastifyPluginOptions = { prefix: '/api' };
app.register(categoriesRoutes, options);
app.register(productsRoutes, options);

const initServer = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    await app.listen({ port });
  } catch (err) {
    app.log.error(err);
    process.exit(2);
  }
};

mongoose
  .connect('mongodb://docker:docker@localhost:27017/waiter?authSource=admin')
  .then(() => initServer())
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
