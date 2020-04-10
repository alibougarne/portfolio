import Component from 'vue-class-component';
import CreateProject from '../create/CreateProject.vue';
import ButtonMixin from '@/mixins/buttons';
import { Mixins } from 'vue-property-decorator';
import { projectModule } from '@/store/modules/project/project.module';
import { AxiosResponse } from 'axios';
import NotificationMixin from '@/mixins/notification';
import Project from '@/store/modules/project/project.entity';

@Component({
  components: { CreateProject }
})
export default class ProjectsList extends Mixins(
  ButtonMixin,
  NotificationMixin
) {
  private projects: Project[] = [];
  private loading: boolean = false;
  private projectDialog: boolean = false;
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
    // { name: 'hashproject', align: 'center', label: 'Calories', field: 'hashproject', sortable: true },
    { name: 'link', label: 'Link', field: 'link', sortable: true },
    // { name: 'description', label: 'Description', field: 'description' },
    { name: 'textColor', label: 'Text Color', field: 'textColor' },
    {
      name: 'backgroundColor',
      label: 'Background Color',
      field: 'backgroundColor'
    }
  ];
  onEmissionFromChild(project: Project) {
    if (project && project.id) {
      this.projects.push(project);
      setTimeout(() => {
        this.projectDialog = false;
      }, 1500);
    }
  }

  private async deleteProject(projectId: string) {
    this.$q.loading.show({
      delay: 400 // ms
    });
    let response: AxiosResponse = await projectModule.deleteProject(projectId);
    console.log(
      '%c⧭ delete project response : ===> ',
      'color: #068daf',
      response
    );
    if (response.status === 200) {
      this.projects = this.projects.filter(
        (project: Project) => project.id !== projectId
      );
      setTimeout(() => {
        this.$q.loading.hide();
        this.notify(
          'green-4',
          'white',
          'cloud_done',
          'Project deleted successfully !'
        );
      }, 900);
    } else {
      setTimeout(() => {
        this.$q.loading.hide();
        this.notify('red', 'white', 'cloud_done', 'delete project failed');
      }, 900);
    }
  }

  created():void{
    this.$q.loading.show();
  }

  async mounted(): Promise<void>{
    try {
      let response: AxiosResponse = await projectModule.loadProjects();
      console.log(
        '%c⧭ load project response : ===> ',
        'color: #068daf',
        response
      );
      if (response.status === 200) {
        this.projects = response.data? response.data : [];
        setTimeout(() => {
          this.$q.loading.hide();
          this.notify(
            'green-4',
            'white',
            'cloud_done',
            'Projects loaded successfully !'
          );
        }, 900);
      } else {
        setTimeout(() => {
          this.$q.loading.hide();
          this.notify('red', 'white', 'cloud_done', 'loading projects failed');
        }, 900);
      }
    } catch (error) {
      console.log('%c⧭', 'color: #00e600', error);
      setTimeout(() => {
        this.$q.loading.hide();
        this.notify('red', 'white', 'cloud_done', 'loading projects failed');
      }, 900);
    }
  }
  afterMount(): void {
    // {
    //   "id": "06f5d316-4327-4ded-8472-0472ef57985e",
    //   "createdAt": "2020-03-18T21:31:39.000Z",
    //   "updatedAt": "2020-03-18T21:31:39.000Z",
    //   "name": "Joomla",
    //   "hashproject": "joomla",
    //   "link": "https://joomla.org",
    //   "description": "Joomla is a free and open-source content management system for publishing web content, developed by Open Source Matters, Inc. It is built on a model–view–controller web application framework that can be used independently of the CMS",
    //   "textColor": "#fff",
    //   "backgroundColor": "#18487a",
    //   "logoPath": "resources/projects/joomla.png"
    // }
    console.log('%c⧭ projects ===> ', 'color: #f2ceb6', this.projects);
  }
}
