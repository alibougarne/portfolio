import Axios, { AxiosResponse } from 'axios';
import Category from './category.entity';

export default class CategoryService {
  static async loadCategories(): Promise<Category[]> {
    let categories: Category[] = [];
    await Axios.get('/api/categories/').then((response: AxiosResponse) => {
      categories = response.data as Category[];
    });
    return categories;
  }

  static async createCategory(category: Category): Promise<Category> {
    await Axios.post('/api/categories', category).then(
      (response: AxiosResponse) => {
        category = response.data as Category;
      }
    );
    return category;
  }

  static async updateCategory(category: Category): Promise<Category> {
    await Axios.patch('/api/categories', category).then(
      (response: AxiosResponse) => {
        category = response.data as Category;
      }
    );
    return category;
  }
}
