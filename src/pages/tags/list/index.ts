import Vue from 'vue';
import Component from 'vue-class-component';
import { tagModule } from '@/store/modules/tag/tag.module';
import Tag from '@/store/modules/tag/tag.entity';
import TagComponent from '@/components/tag/TagComponent.vue';
import gsap from 'gsap';
@Component({
  components: { TagComponent }
})
export default class TagsPage extends Vue {
  public tags: Tag[] = [];

  public async mounted(): Promise<void> {
    this.$q.loading.show({
      // delay: 400 // ms
    });
    // this.tags = await tagModule.loadTags();
    tagModule
      .loadTags()
      .then((response: Tag[]) => {
        this.tags = response;
        // let tempTags: Tag[] = [];
        // if (this.tags.length)
        //   this.tags.forEach(async (tag: Tag) => {
        //     tagModule.getTagImage(tag.logoPath || '').then(url => {
        //       tag.cloudImageUrl = url;
        //       tempTags.push(tag);
        //     });
        //   });
        // this.tags = tempTags;
        console.log('%c⧭', 'color: #1d3f73', this.tags);
        setTimeout(() => {
          this.$q.loading.hide();
        }, 1000);
        if (this.$route.name === 'Tags') {
          this.$nextTick(() => {
            gsap.from(this.$el.childNodes, {
              duration: 2,
              scale: 0.5,
              opacity: 0,
              delay: 0.5,
              stagger: 0.2,
              ease: 'elastic',
              force3D: false
            });
            // this.$el.childNodes.forEach((element:ChildNode,index:number) => {
            //   console.log('%c⧭', 'color: #f200e2', element);
            // });
          });
        }
      })
      .catch((error: Error) => {
        this.$q.loading.hide();
        console.log(error);
      });
  }
}
