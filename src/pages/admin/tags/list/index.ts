import Component from 'vue-class-component';
import TagsPage from '@/pages/tags/list';
import CreateTag from '../create/CreateTag.vue'
@Component({
  components: { CreateTag }
})
export default class TagsList extends TagsPage {

  private loading: boolean = false;
  private tagDialog: boolean = false;
  private filter: string = '';
  private columns: Object[] = [
    {
      name: 'name',
      required: true,
      label: 'Name',
      align: 'left',
      field: (row:any) => row.name,
      format: (val:any) => `${val}`,
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
