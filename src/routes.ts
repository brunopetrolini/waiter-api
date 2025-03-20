import type { FastifyInstance } from 'fastify';

import { CategoriesController } from './controllers';

export function categoriesRoutes(app: FastifyInstance) {
  const categoriesController = new CategoriesController();

  app.get('/categories', (request, reply) =>
    categoriesController.findAll(request, reply),
  );

  app.post('/categories', (request, reply) =>
    categoriesController.create(request, reply),
  );
}
