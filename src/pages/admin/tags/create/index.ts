import Vue from 'vue';
import Component from 'vue-class-component';
import TagComponent from '@/components/tag/TagComponent.vue';
import Tag from '@/store/modules/tag/tag.entity';
import { Common } from '@/store/modules/common/common.entity';
import { AxiosResponse } from 'axios';
import { tagModule } from '@/store/modules/tag/tag.module';
import { Emit, Mixins, Prop, PropSync, Watch } from 'vue-property-decorator';
import ButtonMixin from '@/mixins/buttons';
@Component({
  components: { TagComponent }
})
export default class CreateTag extends Mixins(ButtonMixin) {
  @Prop()
  private tag!: Tag;
  @PropSync('name', { type: String }) syncedName!: string;
  private isCreatingTag: boolean = false;
  private tagImage: File = new File([''], 'image.png', { type: 'image/png' });
  private canSaveTag: boolean = false;
  public contentStyle: object = {};
  public contentActiveStyle: object = {};
  public thumbStyle: object = {
    right: '2px',
    borderRadius: '0px',
    backgroundColor: 'darkgoldenrod',
    width: '5px',
    opacity: 0.75
  };
  // get inputsWrapperHeight(){
  //   return (document as any).querySelector(".tag--inputs").offsetHeight;
  // }
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
  get link_API(): string {
    return process.env.API || '';
  }
  @Emit('emission-from-child')
  emitTagToTagsList(tag: Tag) {}
  checkFile(e: any) {
    console.log('%c⧭ file Uploaaader ===> ', 'color: #bfffc8', e);
  }
  checkFileType(file: any) {
    console.log('%c⧭', 'color: #1d3f73', file[0]._img, typeof file);
    if (file.filter((file: any) => file.type === 'image/png')) {
      this.tagImage = file[0];
      console.log('%c⧭', 'color: #cc0088', this.tagImage);
    }
    return file.filter((file: any) => file.type === 'image/png');
  }

  // @Watch('tag', { immediate: true, deep: true })
  // canSave(newValue: Tag, oldvalue: Tag) {
  //   console.log('%c⧭ tag old ==> ', 'color: #ffa280', oldvalue);
  //   console.log('%c⧭ tag new ==> ', 'color: #e6accb', newValue);
  //   if (newValue && newValue.id) {
  //     this.canSaveTag = true;
  //   }
  // }

  get checkIfCanSaveTag(){
    this.canSaveTag = !!this.tagImage.size || !!this.tag.id;
    return this.canSaveTag
  }
  // @Watch('tagImage', { immediate: true, deep: true })
  // canSaveIfEditTag(newValue: Tag, oldvalue: Tag) {
  //   console.log('%c⧭ tagimage old ==> ', 'color: #ffa280', oldvalue);
  //   console.log('%c⧭ tagimage new ==> ', 'color: #e6accb', newValue);
  //   if (oldvalue) {
  //     this.canSaveTag = true;
  //   }
  // }

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
        if (
          response.data &&
          (response.status === 201 || response.status === 200)
        ) {
          this.emitTagToTagsList(<Tag>response.data);
          this.startComputing(300);
          setTimeout(() => {
            this.isCreatingTag = false;
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: `Tag ${this.tag.id ? 'edited' : 'saved'} successfully !`
            });
          }, 900);
        } else {
          setTimeout(() => {
            this.isCreatingTag = false;
            this.$q.notify({
              color: 'red',
              textColor: 'white',
              icon: 'cloud_done',
              message: `${this.tag.id ? 'editing' : 'saving'} tag failed`
            });
          }, 900);
        }
      }
    } catch (error) {
      setTimeout(() => {
        this.isCreatingTag = false;
        this.$q.notify({
          color: 'red',
          textColor: 'white',
          icon: 'cloud_done',
          message: `${
            this.tag.id ? 'editing' : 'saving'
          } tag failed,error server, please try later`
        });
      }, 900);
    }
  }

  private onReset() {
    this.tag = new Tag();
    this.tagImage = new File([''], 'image.png', { type: 'image/png' });
  }

  public async mounted(): Promise<void> {
    // console.log('%c⧭', 'color: #eeff00', this.checkIfCanSaveTag);
    // console.log(this.tagImage);
    if (this.tag.id) {
      // this.tagImage.src = `${this.imageLink}/tags/image/${this.tag.logoPath}`
      // this.tagImage.alt = this.tag.logoPath
    }
    this.syncedName = 'merssssss';
    // console.log('%c⧭ name ====> ', 'color: #006dcc', this.syncedName);
    // this.tags = await tagModule.loadTags();
  }
}
