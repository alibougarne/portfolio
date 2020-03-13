import { Common } from '@/store/modules/common/common.entity';

export default class Education extends Common {
  constructor(){
    super();
  }
  diplomeName?: string = '';
  establishmentName?: string = '';
  description?: string = '';
  social?: string = '';
  beginDate?: Date;
  endDate?: Date;
  // country?: Country;
}
