import Vue from 'vue';
import Component from 'vue-class-component';
import TagComponent from '@/components/tag/TagComponent.vue';
import Tag from '@/store/modules/tag/tag.entity';
import { Common } from '@/store/modules/common/common.entity';
import { AxiosResponse } from 'axios';
import { tagModule } from '@/store/modules/tag/tag.module';
import { Emit, Mixins, Prop, PropSync } from 'vue-property-decorator';
import ButtonMixin from '@/mixins/buttons';
@Component({
  components: { TagComponent }
})
export default class CreateTag extends Mixins(ButtonMixin) {
  @Prop()
  private tag!: Tag;
  @PropSync('name', { type: String }) syncedName!: string;
  private isCreatingTag: boolean = false;
  // private tagImage: File = new File([""], "image", {type: "image/*"});
  private tagImage: File = new File([''], 'image.png', { type: 'image/*' });

  @Emit('emission-from-child')
  emitTagToTagsList(tag: Tag) {}

  get inputs(): string[] {
    return (
      Object.keys(new Tag())
        // .filter(input => ![ 'id', 'logoPath'].includes(input))
        .filter(
          input =>
            [
              ...Object.keys(new Common()),
              'textColor',
              'backgroundColor',
              'description'
            ].indexOf(input) < 0
        )
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
    const formData = new FormData();
    formData.append('tagImage', this.tagImage);
    formData.append('tag', JSON.stringify(this.tag));
    try {
      let response: AxiosResponse = this.tag.id
        ? await tagModule.editTag(formData)
        : await tagModule.createTag(formData);
      console.log(
        '%c⧭ create/edit tag response : ===> ',
        'color: #aa00ff',
        response
      );
      if (response.data) {
        if (response.data && response.status === 201) {
          this.emitTagToTagsList(<Tag>response.data);
          this.startComputing(300);
          setTimeout(() => {
            this.isCreatingTag = false;

            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Tag saved successfully !'
            });
          }, 900);
        } else {
          setTimeout(() => {
            this.isCreatingTag = false;
            this.$q.notify({
              color: 'red',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'save tag failed'
            });
          }, 900);
        }
      }
    } catch (error) {
      setTimeout(() => {
        this.isCreatingTag = false;
        this.$q.notify({
          color: 'tomato',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'save tag failed,error server, please try later'
        });
      }, 900);
    }
  }
  private onReset() {
    this.tag = new Tag();
    this.tagImage = new File([''], 'image.png', { type: 'image/*' });
  }
  public async mounted(): Promise<void> {
    this.syncedName = 'merssssss';
    console.log('%c⧭ name ====> ', 'color: #006dcc', this.syncedName);
    // this.tags = await tagModule.loadTags();
  }
}
