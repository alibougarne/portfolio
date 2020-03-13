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
  public async loadCompany() {
    let companies: Company[] = [];
    console.log(
      '%c⧭ companies before load is 💩 ==> ',
      'color: #f2ceb6',
      companies
    );
    companies = await this.companyService.loadCompanies();
    console.log('%c⧭ companies after load is 🍏', 'color: #00e600', companies);
    this.setCompany(companies);
    // return Company;
  }
}

// register module (could be in any file 😅)
import store from '@/store/index';
import Company from './company.entity';
import CompanyService from './company.service';
export const companyModule = new CompanyModule({ store, name: 'company' });
