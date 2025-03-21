import { Order, OrderModel } from './models';

export class OrdersRepository {
  async listAll(): Promise<Order[] | []> {
    return await OrderModel.find()
      .sort({ createdAt: 'desc' })
      .populate('products.product');
  }

  async create(order: Partial<Order>): Promise<Order> {
    return await OrderModel.create(order);
  }
}
