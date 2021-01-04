import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules';

@Module
class CountryModule extends VuexModule {
  // state
  public countries: country[] = [];
  private countryService: countryService = new countryService();
  // mutations
  @Mutation
  private setcountry(countries: country[]) {
    this.countries = countries;
  }
  // getters
  // 😅 not yet
  // actions
  @Action
  public async loadcountries() {
    let countries: country[] = [];
    console.log(
      '%c⧭ countries before load is 💩 ==> ',
      'color: #f2ceb6',
      countries
    );
    countries = await this.countryService.loadCountries();
    console.log('%c⧭ countries after load is 🍏', 'color: #00e600', countries);
    this.setcountry(countries);
    // return country;
  }
}

// register module (could be in any file 😅)
import store from '@/store/index';
import country from './country.entity';
import countryService from './country.service';
export const countryModule = new CountryModule({ store, name: 'country' });
