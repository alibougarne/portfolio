import Axios, { AxiosResponse } from 'axios';
import Project from './project.entity';

export default class ProjectService {


  static async loadProjects(take?:number, skip?:number): Promise<AxiosResponse<Project[]>> {
    const link  = skip || take ? `?skip=${skip}&take=${take}`:''
    return await Axios.get(`/api/projects${link}`);
  }

  static async loadProjectsPerTag(tagId:string): Promise<Project[]> {
    let projects: Project[] = [];
    await Axios.get('/api/projects/tag/'+tagId).then((response: AxiosResponse) => {
      projects = response.data;
    });
    return projects;
  }

  static async createProject(formData: FormData): Promise<AxiosResponse> {
    return await Axios.post('/api/projects/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
  
  static async editProject(formData: FormData): Promise<AxiosResponse> {
    return await Axios.put('/api/projects/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  static async deleteProject(projectId: string): Promise<AxiosResponse> {
    return await Axios.delete(`/api/projects/${projectId}`);
  }
}