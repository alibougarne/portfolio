import Axios, { AxiosResponse } from 'axios';
import Project from './project.entity';

export default class ProjectService {
  public async loadProjectsPerTag(tagId:string): Promise<Project[]> {
    let projects: Project[] = [];
    await Axios.get('/api/projects/tag/'+tagId).then((response: AxiosResponse) => {
      projects = response.data;
    });
    return projects;
  }

  async deleteProject(projectId: string): Promise<AxiosResponse> {
    return await Axios.delete(`/api/projects/delete/${projectId}`);
  }
}