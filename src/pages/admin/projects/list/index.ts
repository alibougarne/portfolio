import Component from 'vue-class-component';
import CreateProject from '../create/CreateProject.vue';
import ButtonMixin from '@/mixins/buttons';
import { Mixins } from 'vue-property-decorator';
import { projectModule } from '@/store/modules/project/project.module';
import { AxiosResponse } from 'axios';
import NotificationMixin from '@/mixins/notification';
import Project from '@/store/modules/project/project.entity';
import Tag from '~/src/store/modules/tag/tag.entity';

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
  private currentProject: Project = new Project();
  private filter: string = '';
  private columns: Object[] = [
    // {
    //   "id": "61a70ee9-aa5e-49a0-a8c0-dfc346e127cd",
    //   "createdAt": "2020-03-20T22:48:23.000Z",
    //   "updatedAt": "2020-03-20T22:48:23.000Z",
    //   "name": "B2B Brandt france",
    //   "description": "The business-to-business application for the major retailers of the French Brandt Group France",
    //   "rating": 0,
    //   "link": null,
    //   "beginDate": "2020-03-20T22:48:23.125Z",
    //   "endDate": "2020-03-20T22:48:23.125Z",
    //   "category": {
    //     "id": "c0fe0aa5-32fd-4274-9dd8-dc80f8486780",
    //     "createdAt": "2020-03-20T22:48:23.000Z",
    //     "updatedAt": "2020-03-20T22:48:23.000Z",
    //     "name": "Web Application"
    //   },
    //   "company": {
    //     "id": "b3c9626e-1810-4e2d-abff-43a193cacf75",
    //     "createdAt": "2020-03-20T22:48:22.000Z",
    //     "updatedAt": "2020-03-20T22:48:22.000Z",
    //     "name": "Brandt france",
    //     "link": "https://airalgerie.dz/",
    //     "type": "multinational",
    //     "description": "Brandt is the main brand of the Brandt Group. Brandt offers extensive product ranges in the fields of washing, cooking, cooling, small appliances, television and air conditioning.",
    //     "beginDate": "2018-04-15",
    //     "endDate": "2019-05-25",
    //     "logoPath": "http://www.brandt.com/sites/brandt_international/files/brandt_anglais.png"
    //   },
      // "tags": [
      //   {
      //     "id": "3cc5438b-6d7e-4d13-9399-95973aa2d5e0",
      //     "createdAt": "2020-03-20T22:48:22.000Z",
      //     "updatedAt": "2020-03-20T22:48:22.000Z",
      //     "name": "Spring Boot",
      //     "hashtag": "springboot",
      //     "link": "https://spring.io/projects/spring-boot",
      //     "description": "Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can \"just run\"",
      //     "textColor": "#fff",
      //     "backgroundColor": "#6db33f",
      //     "logoPath": "resources/tags/springboot.png"
      //   },
      //   {
      //     "id": "c4e9a544-e6e1-44ed-a2a3-c1f698d5e1f0",
      //     "createdAt": "2020-03-20T22:48:22.000Z",
      //     "updatedAt": "2020-03-20T22:48:22.000Z",
      //     "name": "Vue Js",
      //     "hashtag": "vuejs",
      //     "link": "https://vuejs.org",
      //     "description": "Vue.js is an open-source Model–view–viewmodel JavaScript framework for building user interfaces and single-page applications. It was created by Evan You, and is maintained by him and the rest of the active core team members coming from various companies such as Netlify and Netguru",
      //     "textColor": "#fff",
      //     "backgroundColor": "#4fc08d",
      //     "logoPath": "resources/tags/vuejs.png"
      //   },
      //   {
      //     "id": "26fb8c18-21e5-41d2-8668-98b95a9f7f2b",
      //     "createdAt": "2020-03-20T22:48:22.000Z",
      //     "updatedAt": "2020-03-20T22:48:22.000Z",
      //     "name": "Node Js",
      //     "hashtag": "nodejs",
      //     "link": "https://nodejs.org",
      //     "description": "Node.js® is a JavaScript runtime built on Chrome´s V8 JavaScript engine.",
      //     "textColor": "#fff",
      //     "backgroundColor": "#026e00",
      //     "logoPath": "resources/tags/nodejs.png"
      //   }
      // ]
    // }
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
    {
      name: 'category',
      label: 'Category',
      field: (row: any) => row.category.name,
      format: (val: any) => `${val}`,
      sortable: true
    },
    {
      name: 'company',
      label: 'Company',
      field: (row: any) => row.company.name,
      format: (val: any) => `${val}`
    },
    {
      name: 'tag',
      label: 'Tag',
      field: (row: any) => {
        return row.tags.map(function(tag: Tag){
          return tag.name;
      }).join(", ")
      }
    },
    {
      name: 'rating',
      label: 'Rating',
      field: 'rating'
    }
  ];
  onEmissionFromChild(project: Project) {
    if (project && project.id) {
      if (this.projects.filter((pr: Project) => pr.id === project.id)) {
        this.projects = this.projects.map((pr: Project) => {
          if (pr.id === project.id) {
            pr = project;
          }
          return pr;
        });
      } else {
        this.projects.push(project);
      }
      setTimeout(() => {
        this.projectDialog = false;
        this.currentProject = new Project();
      }, 1500);
    }
  }

  private setCurrentProject(project: Project) {
    if (project){
      this.currentProject = { ...project };
    }else{
      this.currentProject = new Project;
    }
    this.projectDialog = true;
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

  created(): void {
    this.$q.loading.show();
  }

  async mounted(): Promise<void> {
    try {
      let response: AxiosResponse = await projectModule.loadProjects();
      console.log(
        '%c⧭ load project response : ===> ',
        'color: #068daf',
        response
      );
      if (response.status === 200) {
        this.projects = response.data ? response.data : [];
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
