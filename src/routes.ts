import type { FastifyInstance } from 'fastify';

import { CategoriesController, ProductsController } from './controllers';

export function categoriesRoutes(app: FastifyInstance) {
  const categoriesController = new CategoriesController();

  app.get('/categories', (request, reply) =>
    categoriesController.findAll(request, reply),
  );

  app.post('/categories', (request, reply) =>
    categoriesController.create(request, reply),
  );
}

export function productsRoutes(app: FastifyInstance) {
  const productsController = new ProductsController();

  app.get('/products', (request, reply) =>
    productsController.listAll(request, reply),
  );

  app.post('/products', (request, reply) =>
    productsController.create(request, reply),
  );
}
