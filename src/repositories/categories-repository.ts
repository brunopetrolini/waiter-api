import { type Category, CategoryModel } from './models';

export class CategoriesRepository {
  async findAll() {
    return await CategoryModel.find();
  }

  async create(category: Partial<Category>) {
    return await CategoryModel.create(category);
  }
}
