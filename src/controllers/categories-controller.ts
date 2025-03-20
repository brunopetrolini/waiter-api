import type { FastifyReply, FastifyRequest } from 'fastify';

import { CategoriesRepository } from '@/repositories/categories-repository';

export class CategoriesController {
  async findAll(request: FastifyRequest, reply: FastifyReply) {
    const categoriesRepository = new CategoriesRepository();
    const categories = await categoriesRepository.findAll();
    reply.send(categories);
  }
}
