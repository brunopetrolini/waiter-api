import type { Request, Response } from 'express';

import { Product } from '@/repositories/models';
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

  async create(request: Request, response: Response) {
    const createdProduct = await this.productsRepository.create(
      request.body as Partial<Product>,
    );
    response.status(201).json(createdProduct);
  }
}
