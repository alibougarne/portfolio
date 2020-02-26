import Vue from 'vue';
import Component from 'vue-class-component';
import{Prop} from 'vue-property-decorator';
import Project from '@/store/modules/project/project.entity';
import TagComponent from '@/components/tag/TagComponent.vue'
import imageHolder from './imageHolder'

@Component({
  components: {TagComponent}
})
export default class ProjectCardComponent extends Vue { 
  @Prop() 
  public project?:Project;
  public imgHolder = imageHolder;

  public mounted():void{
    console.log('%c⧭ project card: project====>', 'color: #00e600', this.project);
  }
}