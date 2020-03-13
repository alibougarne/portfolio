import { Common } from '@/store/modules/common/common.entity';

export default class Country extends Common {
  
  diplomeName?: string = '';
  establishmentName?: string = '';
  description?: string = '';
  social?: string = '';
  beginDate?: Date;
  endDate?: Date;
  // country?: Country;
}
