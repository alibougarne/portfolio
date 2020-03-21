import Vue from 'vue';
import Component from 'vue-class-component';
import TagComponent from '@/components/tag/TagComponent.vue';
import Tag from '@/store/modules/tag/tag.entity';
import { Common } from '@/store/modules/common/common.entity';
import { AxiosResponse } from 'axios';
import { tagModule } from '@/store/modules/tag/tag.module';
import { Emit, Mixins } from 'vue-property-decorator';
import ButtonMixin from '@/mixins/buttons';
@Component({
  components: { TagComponent }
})
export default class CreateTag extends Mixins(ButtonMixin) {
  private tag: Tag = new Tag();
  private isCreatingTag: boolean = false;
  // private tagImage: File = new File([""], "image", {type: "image/*"});
  private tagImage :File = new File([""], "image.png", {type: "image/*"});

  @Emit('emission-from-child')
  emitTagToTagsList(tag: Tag) {}
 
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

  private async saveTag() {
    this.isCreatingTag = true;
    const formData = new FormData;
    formData.append("tagImage", this.tagImage);
    formData.append("tag", JSON.stringify(this.tag));
    let response: AxiosResponse = await tagModule.createTag(formData);
    console.log('%c⧭ create tag response : ===> ', 'color: #aa00ff', response);
    if(response.data){
      if (response.data && response.status === 201){
        this.emitTagToTagsList(<Tag>response.data);
        this.isProcessing = true;
        this.startComputing(300);
        setTimeout(() => {
          this.isCreatingTag = false;
          this.isProcessing = false;

          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Tag saved successfully !'
          });
        },900)
      }else{
        setTimeout(() => {
          this.isCreatingTag = false;
          this.isProcessing = false;
          this.$q.notify({
            color: 'red',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'save tag failed'
          });
        },900)
      }
    }
  }

  private onReset() {
    this.tag = new Tag();
    this.tagImage = new File([""], "image.png", {type: "image/*"});;
  }
  public async mounted(): Promise<void> {
    // this.tags = await tagModule.loadTags();
  }
}
