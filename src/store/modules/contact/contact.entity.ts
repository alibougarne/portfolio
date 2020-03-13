import { Common } from '@/store/modules/common/common.entity';
import Education from '../education/education.entity';

export default class Contact extends Common {
  name?: string = '';
  lastName?: string = '';
  slogan?: string = '';
  description?: string = '';
  phones?: string = '';
  languages?: string = '';
  birthday?: Date;
  country?: Country;
  educations?: Education[];
  jobs?: Education[];
}
