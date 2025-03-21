import type { Request, Response } from 'express';

import { ProductsRepository } from '@/repositories/products-repository';

import { createProductSchema } from './schemas/create-product-schema';

export class ProductsController {
  private readonly productsRepository: ProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  async listAll(_request: Request, response: Response) {
    const products = await this.productsRepository.findAll();
    response.json(products);
  }

  async create(request: Request, response: Response) {
    if (!request.file) {
      return response.status(400).json({ error: 'Product image is required' });
    }
    const product = createProductSchema.parse(request.body);
    const productWithImagePath = {
      ...product,
      imagePath: request.file?.filename,
    };
    const createdProduct =
      await this.productsRepository.create(productWithImagePath);
    response.status(201).json(createdProduct);
  }
}
