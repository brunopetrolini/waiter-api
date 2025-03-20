import type { Request, Response } from 'express';

import { CategoriesRepository } from '@/repositories/categories-repository';

import { createCategorySchema } from './schemas';

export class CategoriesController {
  private readonly categoriesRepository: CategoriesRepository;

  constructor() {
    this.categoriesRepository = new CategoriesRepository();
  }

  async findAll(_request: Request, response: Response) {
    const categories = await this.categoriesRepository.findAll();
    response.json(categories);
  }

  async create(request: Request, response: Response) {
    const category = createCategorySchema.parse(request.body);
    const createdCategory = await this.categoriesRepository.create(category);
    response.status(201).json(createdCategory);
  }
}
