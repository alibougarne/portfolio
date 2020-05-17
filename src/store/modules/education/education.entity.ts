import { Common } from '@/store/modules/common/common.entity';
import Country from '../country/country.entity';

export default class Education extends Common {

  diplomeName?: string = '';
  establishmentName?: string = '';
  description?: string = '';
  social?: string = '';
  beginDate?: Date;
  endDate?: Date;
  country?: Country;
}
