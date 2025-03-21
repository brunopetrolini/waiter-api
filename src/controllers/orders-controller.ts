import { Request, Response } from 'express';

import { OrdersRepository } from '@/repositories/orders-repository';

import { createOrderSchema } from './schemas';

export class OrdersController {
  private readonly ordersRepository: OrdersRepository;

  constructor() {
    this.ordersRepository = new OrdersRepository();
  }

  async listAll(_request: Request, response: Response) {
    const orders = await this.ordersRepository.listAll();
    return response.json(orders);
  }

  async create(request: Request, response: Response) {
    const order = createOrderSchema.parse(request.body);
    const createdOrder = await this.ordersRepository.create(order);
    return response.status(201).json(createdOrder);
  }
}
