import Axios, { AxiosResponse } from 'axios';
import Company from './company.entity';

export default  class CompanyService {

  static async loadCompanies(): Promise<Company[]> {
    let companies: Company[] = [];
    await Axios.get('/api/companies/').then((response: AxiosResponse) => {
      companies = response.data as Company[];
    });
    return companies;
  }

  static async createCompany(company:Company): Promise<Company> {
    await Axios.post('/api/companies/create',Company).then((response: AxiosResponse) => {
      company = response.data as Company;
    });
    return company;
  }

  static async updateCompany(company:Company): Promise<Company> {
    await Axios.patch('/api/companies/update',company).then((response: AxiosResponse) => {
      company = response.data as Company;
    });
    return company;
  }
}