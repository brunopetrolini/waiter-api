import type { FastifyReply, FastifyRequest } from 'fastify';

import { CategoriesRepository } from '@/repositories/categories-repository';

import { createCategorySchema } from './schemas';

export class CategoriesController {
  private readonly categoriesRepository: CategoriesRepository;

  constructor() {
    this.categoriesRepository = new CategoriesRepository();
  }

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    const categories = await this.categoriesRepository.findAll();
    reply.send(categories);
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const category = createCategorySchema.parse(request.body);
    const createdCategory = await this.categoriesRepository.create(category);
    reply.code(201).send(createdCategory);
  }
}
