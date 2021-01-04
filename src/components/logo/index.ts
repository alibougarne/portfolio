import Vue from 'vue';
import Component from 'vue-class-component';
import{Prop} from 'vue-property-decorator';
import Project from '@/store/modules/project/project.entity';
import TagComponent from '@/components/tag/TagComponent.vue'

@Component({
  components: {TagComponent}
})
export default class LogoComponent extends Vue { 
  public mounted():void{
  }
}