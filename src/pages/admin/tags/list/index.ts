import Vue from 'vue';
import Component from 'vue-class-component';
import TagComponent from '@/components/tag/TagComponent.vue';
import Tag from '@/store/modules/tag/tag.entity';
import { Common } from '@/store/modules/common/common.entity';
import Axios from 'axios';
@Component({
  components: { TagComponent }
})
export default class TagsList extends Vue {
  public async mounted(): Promise<void> {
    // this.tags = await tagModule.loadTags();
  }
}
