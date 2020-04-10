import Component from 'vue-class-component';
import TagsPage from '@/pages/tags/list';
import CreateTag from '../create/CreateTag.vue';
import Tag from '@/store/modules/tag/tag.entity';
import ButtonMixin from '@/mixins/buttons';
import { Mixins } from 'vue-property-decorator';
import { tagModule } from '@/store/modules/tag/tag.module';
import { AxiosResponse } from 'axios';
import NotificationMixin from '@/mixins/notification';

@Component({
  components: { CreateTag }
})
export default class ProjectssList extends Mixins(
  ButtonMixin,
  TagsPage,
  NotificationMixin
) {
  private loading: boolean = false;
  private tagDialog: boolean = false;
  private filter: string = '';
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
    }
  ];
  onEmissionFromChild(tag: Tag) {
    if (tag && tag.id) {
      this.tags.push(tag);
      setTimeout(() => {
        this.tagDialog = false;
      }, 1500);
    }
  }

  private async deleteTag(tagId: string) {
    this.$q.loading.show({
      delay: 400 // ms
    });
    let response: AxiosResponse = await tagModule.deleteTag(tagId);
    console.log('%c⧭ delete tag response : ===> ', 'color: #068daf', response);
    if (response.status === 200) {
        this.tags = this.tags.filter((tag:Tag) => tag.id !== tagId);
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
          this.notify(
            'red',
            'white',
            'cloud_done',
            'delete tag failed'
          );
        }, 900);
      }
  }

  afterMount(): void {
    // {
    //   "id": "06f5d316-4327-4ded-8472-0472ef57985e",
    //   "createdAt": "2020-03-18T21:31:39.000Z",
    //   "updatedAt": "2020-03-18T21:31:39.000Z",
    //   "name": "Joomla",
    //   "hashtag": "joomla",
    //   "link": "https://joomla.org",
    //   "description": "Joomla is a free and open-source content management system for publishing web content, developed by Open Source Matters, Inc. It is built on a model–view–controller web application framework that can be used independently of the CMS",
    //   "textColor": "#fff",
    //   "backgroundColor": "#18487a",
    //   "logoPath": "resources/tags/joomla.png"
    // }
    console.log('%c⧭ tags ===> ', 'color: #f2ceb6', this.tags);
  }
}
