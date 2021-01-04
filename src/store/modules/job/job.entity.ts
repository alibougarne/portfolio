import { Common } from '@/store/modules/common/common.entity';
import Country from '../country/country.entity';
import Company from '../company/company.entity';

export default class Job extends Common {
  jobTitle?: string = '';
  mission?: string = '';
  beginDate?: Date;
  endDate?: Date;
  country?: Country;
  company?: Company;
}
