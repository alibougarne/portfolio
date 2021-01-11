import { VuexModule, Module, Action } from 'vuex-class-modules';
import ProjectService from './project.service';
import Project from './project.entity';
import Pagination from '@/helpers/pagination';

@Module
class ProjectModule extends VuexModule {
  // state
  // mutations
  // actions
  @Action
  public async loadProjects(pagination:Pagination):Promise<AxiosResponse<Project[]>>{
    return await ProjectService.loadProjects(pagination.rowsPerPage, (pagination.page - 1) * pagination.rowsPerPage);
  }

  @Action
  public async loadProjectsPerTag(tagId:string):Promise<Project[]>{
    return await ProjectService.loadProjectsPerTag(tagId);
  }

  @Action
  public async createProject(formData:FormData):Promise<AxiosResponse>{
    return await ProjectService.createProject(formData);
  }

  @Action
  public async editProject(formData:FormData):Promise<AxiosResponse>{
    return await ProjectService.editProject(formData);
  }

  @Action
  public async deleteProject(projectId:string):Promise<AxiosResponse>{
    return await ProjectService.deleteProject(projectId);
  }
}

// register module (could be in any file)
import store from '@/store/index';
import { AxiosResponse } from 'axios';
export const projectModule = new ProjectModule({ store, name: 'project' });