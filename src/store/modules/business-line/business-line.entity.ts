import { Common } from '@/store/modules/common/common.entity';
import Company from '../company/company.entity';

export default class Businessline extends Common {
  name?: string ='';
  description?: string ='';
  mdiIcon?: string ='';
  companies?: Company[]
}
