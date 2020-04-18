import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules';

@Module
class CompanyModule extends VuexModule {
  // state
  // mutations
  // getters
  // 😅 not yet
  // actions
  @Action
  public async loadCompanies() {
    let companies: Company[] = [];
    companies = await CompanyService.loadCompanies();
    return companies;
  }
}

// register module (could be in any file 😅)
import store from '@/store/index';
import Company from './company.entity';
import CompanyService from './company.service';
export const companyModule = new CompanyModule({ store, name: 'company' });
