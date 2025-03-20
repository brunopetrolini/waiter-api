import { Category } from './models';

export class CategoriesRepository {
  async findAll() {
    return await Category.find();
  }
}
