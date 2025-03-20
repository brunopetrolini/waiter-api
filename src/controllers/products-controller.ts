import type { Request, Response } from 'express';

import { ProductsRepository } from '@/repositories/products-repository';

export class ProductsController {
  private readonly productsRepository: ProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  async listAll(request: Request, response: Response) {
    const products = await this.productsRepository.findAll();
    response.json(products);
  }

  async create(request: Request, response: Response) {}
}
