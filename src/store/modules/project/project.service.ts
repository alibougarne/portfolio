import Axios, { AxiosResponse } from 'axios';
import Project from './project.entity';

export default class ProjectService {


  public async loadProjects(): Promise<AxiosResponse<Project[]>> {
    return await Axios.get('/api/projects');
  }

  public async loadProjectsPerTag(tagId:string): Promise<Project[]> {
    let projects: Project[] = [];
    await Axios.get('/api/projects/tag/'+tagId).then((response: AxiosResponse) => {
      projects = response.data;
    });
    return projects;
  }

  async createProject(formData: FormData): Promise<AxiosResponse> {
    return await Axios.post('/api/projects/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
  
  async editProject(formData: FormData): Promise<AxiosResponse> {
    return await Axios.put('/api/projects/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  async deleteProject(projectId: string): Promise<AxiosResponse> {
    return await Axios.delete(`/api/projects/delete/${projectId}`);
  }
}