import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules';
import CategoryService from './category.service';

@Module()
class CategoryModule extends VuexModule {
}

// register module (could be in any file)
import store from '@/store/index';
export const categoryModule = new CategoryModule({ store, name: 'category' });