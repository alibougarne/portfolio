import Axios, { AxiosResponse } from 'axios';
import Company from './company.entity';

export default class CompanyService {

  public async loadCompanies(): Promise<Company[]> {
    let companies: Company[] = [];
    await Axios.get('/api/companies/').then((response: AxiosResponse) => {
      companies = response.data as Company[];
    });
    return companies;
  }

  public async createCompany(company:Company): Promise<Company> {
    await Axios.post('/api/companies/create',Company).then((response: AxiosResponse) => {
      company = response.data as Company;
    });
    return company;
  }

  public async updateCompany(company:Company): Promise<Company> {
    await Axios.patch('/api/companies/update',company).then((response: AxiosResponse) => {
      company = response.data as Company;
    });
    return company;
  }
}