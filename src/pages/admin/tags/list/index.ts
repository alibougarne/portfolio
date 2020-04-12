import Component from 'vue-class-component';
import TagsPage from '@/pages/tags/list';
import CreateTag from '../create/CreateTag.vue';
import Tag from '@/store/modules/tag/tag.entity';
import ButtonMixin from '@/mixins/buttons';
import { Mixins, Watch } from 'vue-property-decorator';
import { tagModule } from '@/store/modules/tag/tag.module';
import { AxiosResponse } from 'axios';
import NotificationMixin from '@/mixins/notification';

@Component({
  components: { CreateTag }
})
export default class TagsList extends Mixins(
  ButtonMixin,
  TagsPage,
  NotificationMixin
) {
  private loading: boolean = false;
  public name: string = 'merzaq';
  private tagDialog: boolean = false;
  private filter: string = '';
  private currentTag: Tag = new Tag();
  private columns: Object[] = [
    {
      name: 'name',
      required: true,
      label: 'Name',
      align: 'left',
      field: (row: any) => row.name,
      format: (val: any) => `${val}`,
      classes: ' ellipsis',
      style: 'max-width: 100px; background: #545454;',
      headerClasses: 'bg-grey-9 text-white',
      sortable: true
    },
    // { name: 'hashtag', align: 'center', label: 'Calories', field: 'hashtag', sortable: true },
    { name: 'link', label: 'Link', field: 'link', sortable: true },
    // { name: 'description', label: 'Description', field: 'description' },
    { name: 'textColor', label: 'Text Color', field: 'textColor' },
    {
      name: 'backgroundColor',
      label: 'Background Color',
      field: 'backgroundColor'
    },
    {
      name: 'logo',
      label: 'Logo',
      field: 'logoPath'
    }
  ];

  get imageLink():string{
    return process.env.API || "";
  }

  @Watch('name')
  watchName(old: string, newval: string) {
    console.log('%c⧭ list ===> name new ', 'color: #e57373', newval);
    console.log('%c⧭ list ===> name old  ', 'color: #731d6d', old);
  }

  onEmissionFromChild(tag: Tag) {
    if (tag && tag.id) {
      if (this.tags.filter((t: Tag) => t.id === tag.id)) {
        this.tags = this.tags.map((t: Tag) => {
          if (t.id === tag.id) {
            t = tag;
          }
          return t;
        });
      } else {
        this.tags.push(tag);
      }
      setTimeout(() => {
        this.tagDialog = false;
        this.currentTag = new Tag();
      }, 1500);
    }
  }

  private setCurrentTag(tag: Tag) {
    this.currentTag = { ...tag };
    this.tagDialog = true;
  }
  private async deleteTag(tagId: string) {
    this.$q.loading.show({
      delay: 400 // ms
    });
    let response: AxiosResponse = await tagModule.deleteTag(tagId);
    console.log('%c⧭ delete tag response : ===> ', 'color: #068daf', response);
    if (response.status === 200) {
      this.tags = this.tags.filter((tag: Tag) => tag.id !== tagId);
      setTimeout(() => {
        this.$q.loading.hide();
        this.notify(
          'green-4',
          'white',
          'cloud_done',
          'Tag deleted successfully !'
        );
      }, 900);
    } else {
      setTimeout(() => {
        this.$q.loading.hide();
        this.notify('red', 'white', 'cloud_done', 'delete tag failed');
      }, 900);
    }
  }

  afterMount(): void {
    console.log('%c⧭ tags ===> ', 'color: #f2ceb6', this.tags);
  }
}
