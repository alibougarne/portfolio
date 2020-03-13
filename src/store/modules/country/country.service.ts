import Axios, { AxiosResponse } from 'axios';
import Country from './country.entity';

export default class CountryService {

  public async loadCountries(): Promise<Country[]> {
    let countries: Country[] = [];
    await Axios.get('/api/countries/').then((response: AxiosResponse) => {
      countries = response.data as Country[];
    });
    return countries;
  }

  public async createCountry(country:Country): Promise<Country> {
    await Axios.post('/api/countries/create',Country).then((response: AxiosResponse) => {
      country = response.data as Country;
    });
    return country;
  }

  public async updateCountry(country:Country): Promise<Country> {
    await Axios.patch('/api/countries/update',country).then((response: AxiosResponse) => {
      country = response.data as Country;
    });
    return country;
  }
}