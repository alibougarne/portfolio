import Vue from 'vue';
import Component from 'vue-class-component';
import TagComponent from '@/components/tag/TagComponent.vue';
import Tag from '@/store/modules/tag/tag.entity';
import { Common } from '@/store/modules/common/common.entity';
import Axios from 'axios';
@Component({
  components: { TagComponent }
})
export default class CreateContact extends Vue {
  private tag: Tag = new Tag();
  private tagImage: any={};

  get inputs(): string[] {
    return Object.keys(this.tag).filter(
      input =>
        [...Object.keys(new Common()), 'textColor', 'backgroundColor','description'].indexOf(
          input
        ) < 0
    );
  }

  get colorPicks(): string[] {
    return ['textColor', 'backgroundColor'];
  }
  public contentStyle: object = {};
  public contentActiveStyle: object = {};
  public thumbStyle: object = {
    right: '2px',
    borderRadius: '0px',
    backgroundColor: 'darkgoldenrod',
    width: '5px',
    opacity: 0.75
  };

  private onSubmit() {
    console.log('%c⧭', 'color: #00e600', this.tag);
    console.log('%c⧭', 'color: #00a3cc', this.tagImage);
    const formData = new FormData;
    formData.append("tagImage", this.tagImage);
    formData.append("tag", JSON.stringify(this.tag));
    Axios.post('/api/tags/create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
    this.$q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    });
  }

  private onReset() {
    this.tag = new Tag();
    this.tagImage = null;
  }
  public async mounted(): Promise<void> {
    // this.tags = await tagModule.loadTags();
  }
}
