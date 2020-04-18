import { Common } from '@/store/modules/common/common.entity';
import Tag from '../tag/tag.entity';
import Category from '../category/category.entity';
import Company from '../company/company.entity';

export default class Project extends Common {
  public name?: string='';
  public description?: string='';
  public rating?:number;
  public link?:string='';
  public categoryId?:string='';
  public companyId?:string='';
  public tagIds?:string[]=[];
  public category?: Category;
  public beginDate?: Date;
  public endDate?: Date;
  public images?: string;
  public mainImage?: string;
  public company?: Company;
  public tags?: Tag[]=[];


}