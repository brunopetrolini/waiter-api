import type { FastifyReply, FastifyRequest } from 'fastify';

import { ProductsRepository } from '@/repositories/products-repository';

import { createProductSchema } from './schemas/create-product-schema';

export class ProductsController {
  private readonly productsRepository: ProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  async listAll(request: FastifyRequest, reply: FastifyReply) {
    const products = await this.productsRepository.findAll();
    reply.send(products);
  }

  // TODO: Implements image upload
  async create(request: FastifyRequest, reply: FastifyReply) {
    const product = createProductSchema.parse(request.body);
    const createdProduct = await this.productsRepository.create(product);
    reply.send(createdProduct);
  }
}
