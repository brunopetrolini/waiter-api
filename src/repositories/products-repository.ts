import { Product, ProductModel } from './models';

export class ProductsRepository {
  async findAll(): Promise<Product[] | []> {
    return await ProductModel.find();
  }
}
