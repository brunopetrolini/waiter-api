import type { FastifyInstance } from 'fastify';

import { CategoriesController } from './controllers';

export function router(app: FastifyInstance) {
  const categoriesController = new CategoriesController();

  app.get('/categories', (request, reply) =>
    categoriesController.findAll(request, reply),
  );
}
