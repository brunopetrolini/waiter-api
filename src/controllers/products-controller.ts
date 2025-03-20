import type { FastifyReply, FastifyRequest } from 'fastify';

import { ProductsRepository } from '@/repositories/products-repository';

export class ProductsController {
  private readonly productsRepository: ProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  async listAll(request: FastifyRequest, reply: FastifyReply) {
    const products = await this.productsRepository.findAll();
    reply.send(products);
  }
}
