import Vue from 'vue';
import Component from 'vue-class-component';
import{Prop} from 'vue-property-decorator';
import Tag from '@/store/modules/tag/tag.entity';

@Component({
  components: {}
})
export default class TagComponent extends Vue { 
  @Prop() 
  public tag?:Tag;
  
  public mounted():void{
  }
}