import { Request, Response } from 'express';

import { OrdersRepository } from '@/repositories/orders-repository';

export class OrdersController {
  private readonly ordersRepository: OrdersRepository;

  constructor() {
    this.ordersRepository = new OrdersRepository();
  }

  async listAll(_request: Request, response: Response) {
    const orders = await this.ordersRepository.listAll();
    return response.json(orders);
  }
}
