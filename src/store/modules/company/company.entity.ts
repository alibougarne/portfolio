import { Common } from '@/store/modules/common/common.entity';
import Country from '../country/country.entity';
import Project from '../project/project.entity';

export default class Company extends Common {
  name?: string = '';
  link?: string = '';
  type?: string = ''; // i mean here if it's a multinational, national... company
  description?: string = ''; // i mean here if it's a multinational, national... company
  beginDate?: Date;
  endDate?: Date;
  logoPath?: string = '';
  country?: Country;
  projects?: Project[];
  businesslines?: Businessline[];
}
