import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules';

@Module
class CompanyModule extends VuexModule {
  // state
  public companies: Company[] = [];
  private companyService: CompanyService = new CompanyService();
  // mutations
  @Mutation
  private setCompany(companies: Company[]) {
    this.companies = companies;
  }
  // getters
  // 😅 not yet
  // actions
  @Action
  public async loadCompanies() {
    let companies: Company[] = [];
    companies = await this.companyService.loadCompanies();
    this.setCompany(companies);
    return companies;
  }
}

// register module (could be in any file 😅)
import store from '@/store/index';
import Company from './company.entity';
import CompanyService from './company.service';
export const companyModule = new CompanyModule({ store, name: 'company' });
