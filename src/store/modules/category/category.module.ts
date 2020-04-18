import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules';
import CategoryService from './category.service';

@Module()
class CategoryModule extends VuexModule {
  @Action
  public async loadCompanies() {
    let categories: Category[] = [];
    categories = await CategoryService.loadCategories();
    return categories;
  }
}

// register module (could be in any file)
import store from '@/store/index';
import Category from './category.entity';
export const categoryModule = new CategoryModule({ store, name: 'category' });
