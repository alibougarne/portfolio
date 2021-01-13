import Vue from 'vue';
import Component from 'vue-class-component';
import { projectModule } from '@/store/modules/project/project.module';
import Project from '@/store/modules/project/project.entity';
import ProjectCardComponent from '@/components/project/card/ProjectCardComponent.vue';
import Pagination from '@/helpers/pagination';
import ButtonMixin from '@/mixins/buttons';
import { Mixins } from 'vue-property-decorator';
import NotificationMixin from '@/mixins/notification';
import { AxiosResponse } from 'axios';
@Component({
  components: { ProjectCardComponent }
})
export default class Projects extends Mixins(
  ButtonMixin,
  NotificationMixin
) {
  public projects: Project[] = [];
  public contentStyle: object = {};
  public contentActiveStyle: object = {};
  public pagination: Pagination = {
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 5
  }
  public thumbStyle: object = {
    right: '2px',
    borderRadius: '0px',
    backgroundColor: 'darkgoldenrod',
    width: '5px',
    opacity: 0.75
  };

  async loadProjects(
    pagination: Pagination,
  ): Promise<Project[]> {
    let projects: Project[] = [];
    let skip: number = (pagination.page - 1) * pagination.rowsPerPage;
    try {
      let response: AxiosResponse = await projectModule.loadProjects(
        pagination
      );
      if (response.status === 200) {
          setTimeout(() => {
            this.$q.loading.hide();
            this.notify(
              'green-4',
              'white',
              'cloud_done',
              'Projects loaded successfully !'
            );
          }, 900);


        projects =
          response.data && response.data.list ? response.data.list : [];
        this.pagination = {
          rowsNumber: response.data.count
            ? response.data.count
            : projects.length,
          ...pagination
        };
      } else {
          setTimeout(() => {
            this.$q.loading.hide();
            this.notify(
              'red',
              'white',
              'cloud_done',
              'loading projects failed'
            );
          }, 900);
      }
    } catch (error) {
        setTimeout(() => {
          this.$q.loading.hide();
          this.notify('red', 'white', 'cloud_done', 'loading projects failed');
        }, 900);

    }
    return projects;
  }
  public async mounted(): void {
    this.$q.loading.show({
      delay: 400 // ms
    });
    const tagId: string = this.$route.params.id;
    if (!!tagId) {
      projectModule
        .loadProjectsPerTag(tagId)
        .then((response: Project[]) => {
          this.projects = response;
          setTimeout(() => {
            this.$q.loading.hide();
          }, 1000);
        })
        .catch((error: Error) => {
          this.$q.loading.hide();
          console.log(error);
        });
    }else{
      this.projects = await this.loadProjects(this.pagination)
    }
  }
}
