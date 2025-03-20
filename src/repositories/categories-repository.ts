import { type Category, CategoryModel } from './models';

export class CategoriesRepository {
  async findAll(): Promise<Category[] | []> {
    return await CategoryModel.find();
  }

  async create(category: Partial<Category>): Promise<Category> {
    return await CategoryModel.create(category);
  }
}
