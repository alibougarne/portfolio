import Component from 'vue-class-component';
import CreateProject from '../create/CreateProject.vue';
import ButtonMixin from '@/mixins/buttons';
import { Mixins, Watch } from 'vue-property-decorator';
import { projectModule } from '@/store/modules/project/project.module';
import { AxiosResponse } from 'axios';
import NotificationMixin from '@/mixins/notification';
import Project from '@/store/modules/project/project.entity';
import Tag from '@/store/modules/tag/tag.entity';
import Pagination from '@/helpers/pagination';

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
  private pagination: Pagination = {
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 5
  };
  private loadingProjects: boolean = false;

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
        return row.tags
          .map(function(tag: Tag) {
            return tag.name;
          })
          .join(', ');
      }
    },
    {
      name: 'rating',
      label: 'Rating',
      field: 'rating'
    }
  ];

  onEmissionFromChild(prj: string) {
    let project = JSON.parse(prj);
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
    if (project) {
      this.currentProject = { ...project };
    } else {
      this.currentProject = new Project();
    }
    this.projectDialog = true;
  }

  private async deleteProject(projectId: string) {
    this.$q.loading.show({
      delay: 400 // ms
    });
    try {
      let response: AxiosResponse = await projectModule.deleteProject(
        projectId
      );
      if (response.status === 200) {
        setTimeout(() => {
          this.projects = this.projects.filter(
            (project: Project) => project.id !== projectId
          );
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
    } catch (error) {
      setTimeout(() => {
        this.$q.loading.hide();
        this.notify('red', 'white', 'cloud_done', 'delete project failed');
      }, 900);
    }
  }

  // @Watch('pagination')
  // public async watchPagination(
  //   current: Pagination,
  //   old: Pagination
  // ): Promise<void> {

  //   if(current.page !== old.page ){
  //     console.log('%c⧭-------- Watch pagination ----------', 'color: #ace2e6', );
  //     console.log('%c⧭ current page ==> ', 'color: #9c66cc', current.page);
  //     console.log('%c⧭ old page ==> ', 'color: #9c66cc', old.page);
  //     this.projects = await this.loadProjects({...current}, false);
  //   }
  // }

  async onRequest(props: any): Promise<void> {
    this.projects = await this.loadProjects({ ...props.pagination }, false);
  }

  async loadProjects(
    pagination: Pagination,
    isGlobalLoading: boolean
  ): Promise<Project[]> {
    let projects: Project[] = [];
    this.loadingProjects = !isGlobalLoading;
    let skip: number = (pagination.page - 1) * pagination.rowsPerPage;
    try {
      let response: AxiosResponse = await projectModule.loadProjects(
        pagination
      );
      if (response.status === 200) {
        if (isGlobalLoading) {
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
            this.loadingProjects = false;
          }, 900);
        }

        projects =
          response.data && response.data.list ? response.data.list : [];
        this.pagination = {
          rowsNumber: response.data.count
            ? response.data.count
            : projects.length,
          ...pagination
        };
      } else {
        if (isGlobalLoading) {
          setTimeout(() => {
            this.$q.loading.hide();
            this.notify(
              'red',
              'white',
              'cloud_done',
              'loading projects failed'
            );
          }, 900);
        } else {
          setTimeout(() => {
            this.loadingProjects = false;
          }, 900);
        }
      }
    } catch (error) {
      if (isGlobalLoading) {
        setTimeout(() => {
          this.$q.loading.hide();
          this.notify('red', 'white', 'cloud_done', 'loading projects failed');
        }, 900);
      } else {
        setTimeout(() => {
          this.loadingProjects = false;
        }, 900);
      }
    }
    return projects;
  }

  created(): void {
    this.$q.loading.show();
  }

  async mounted(): Promise<void> {
    this.projects = await this.loadProjects({ ...this.pagination }, true);
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
  }
  updated(): void {
    console.log('%c⧭ pagination ', 'color: #40fff2', this.pagination);
  }
}
