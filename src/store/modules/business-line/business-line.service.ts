import Axios, { AxiosResponse } from 'axios';
import Businessline from './business-line.entity';

export default class BusinesslineService {

  public async loadBusinesslines(): Promise<Businessline[]> {
    let businesslines: Businessline[] = [];
    await Axios.get('/api/businesslines/').then((response: AxiosResponse) => {
      businesslines = response.data as Businessline[];
    });
    return businesslines;
  }

  public async createBusinessline(businessline:Businessline): Promise<Businessline> {
    await Axios.post('/api/businesslines/create',Businessline).then((response: AxiosResponse) => {
      businessline = response.data as Businessline;
    });
    return businessline;
  }

  public async updateBusinessline(businessline:Businessline): Promise<Businessline> {
    await Axios.patch('/api/businesslines/update',businessline).then((response: AxiosResponse) => {
      businessline = response.data as Businessline;
    });
    return businessline;
  }
}