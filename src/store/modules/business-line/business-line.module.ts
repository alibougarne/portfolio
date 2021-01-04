import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules';

@Module
class BusinesslineModule extends VuexModule {
  // state
  public businesslines: Businessline[] = [];
  private businessLineService: BusinesslineService = new BusinesslineService();
  // mutations
  @Mutation
  private setBusinessline(businesslines: Businessline[]) {
    this.businesslines = businesslines;
  }
  // getters
  // 😅 not yet
  // actions
  @Action
  public async loadBusinessline() {
    let businesslines: Businessline[] = [];
    console.log(
      '%c⧭ businesslines before load is 💩 ==> ',
      'color: #f2ceb6',
      businesslines
    );
    businesslines = await this.businessLineService.loadBusinesslines();
    console.log('%c⧭ businesslines after load is 🍏', 'color: #00e600', businesslines);
    this.setBusinessline(businesslines);
    // return Businessline;
  }
}

// register module (could be in any file 😅)
import store from '@/store/index';
import Businessline from './business-line.entity';
import BusinesslineService from './business-line.service';
export const businesslinesModule = new BusinesslineModule({ store, name: 'businessline' });
