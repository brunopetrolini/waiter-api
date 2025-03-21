import type { Request, Response } from 'express';

import { CategoriesRepository } from '@/repositories/categories-repository';
import { ProductsRepository } from '@/repositories/products-repository';

import { createCategorySchema } from './schemas';

export class CategoriesController {
  private readonly categoriesRepository: CategoriesRepository;
  private readonly productsRepository: ProductsRepository;

  constructor() {
    this.categoriesRepository = new CategoriesRepository();
    this.productsRepository = new ProductsRepository();
  }

  async findAll(_request: Request, response: Response) {
    const categories = await this.categoriesRepository.findAll();
    response.json(categories);
  }

  async findCategoryProducts(request: Request, response: Response) {
    const { id: categoryId } = request.params;
    const categoryProducts =
      await this.productsRepository.findProductsByCategory(categoryId);
    response.json(categoryProducts);
  }

  async create(request: Request, response: Response) {
    const category = createCategorySchema.parse(request.body);
    const createdCategory = await this.categoriesRepository.create(category);
    response.status(201).json(createdCategory);
  }
}
