import { OrderModel } from './models';

export class OrdersRepository {
  async listAll() {
    return await OrderModel.find()
      .sort({ createdAt: 'desc' })
      .populate('products.product');
  }
}
