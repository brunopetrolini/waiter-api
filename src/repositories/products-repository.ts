import { Product, ProductModel } from './models';

export class ProductsRepository {
  async findAll(): Promise<Product[] | []> {
    return await ProductModel.find();
  }

  async create(product: Partial<Product>): Promise<Product> {
    const createdProduct = await ProductModel.create(product);
    return createdProduct;
  }
}
