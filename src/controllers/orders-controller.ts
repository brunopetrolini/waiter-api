import { Request, Response } from 'express';

import { OrdersRepository } from '@/repositories';
import { OrderStatus } from '@/repositories/models';
import { io } from '@/server';

import { changeOrderStatusSchema, createOrderSchema } from './schemas';
import { cancelOrderSchema } from './schemas/cancel-order-schema';

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
    const orderDetails = await createdOrder.populate('products.product');
    io.emit('orders@new', orderDetails);
    return response.status(201).json(createdOrder);
  }

  async changeStatus(request: Request, response: Response) {
    const { params, body } = changeOrderStatusSchema.parse(request);
    await this.ordersRepository.changeStatus(
      params.id,
      OrderStatus[body.status],
    );
    return response.sendStatus(204);
  }

  async cancel(request: Request, response: Response) {
    const { id } = cancelOrderSchema.parse(request.params);
    await this.ordersRepository.cancel(id);
    return response.sendStatus(204);
  }
}
