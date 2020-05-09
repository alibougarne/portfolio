import { Common } from '@/store/modules/common/common.entity';

export default class Tag extends Common {
  public name : string = '';
  public hashtag ?: string = '';
  public link ?: string = '';
  public icon ?: string = '';
  public description ?: string = '';
  public logoPath ?: string;
  public textColor ?: string = '#fff';
  public backgroundColor ?: string = '#fff';
  public cloudImageUrl ?: string ;
}