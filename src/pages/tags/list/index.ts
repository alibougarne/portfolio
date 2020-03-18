import Vue from 'vue';
import Component from 'vue-class-component';
import { tagModule } from '@/store/modules/tag/tag.module';
import Tag from '@/store/modules/tag/tag.entity';
import TagComponent from '@/components/tag/TagComponent.vue';
@Component({
  components: { TagComponent }
})
export default class TagsPage extends Vue {
  public tags: Tag[] = [];

  public async mounted(): Promise<void> {
    this.$q.loading.show({
      delay: 400 // ms
    });
    // this.tags = await tagModule.loadTags();
    tagModule.loadTags().then((response: Tag[]) => {
      this.tags = response;
      console.log('%c⧭ tags===>', 'color: #f2ceb6', response);
      setTimeout(() => {
        this.$q.loading.hide();
      }, 1000)
      this.$nextTick(function () {
        console.log(this.$el) // => 'updated'
      })
    }).catch((error: Error) => {
      this.$q.loading.hide();
      console.log(error);
    });
  }
}
