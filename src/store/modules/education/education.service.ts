import Axios, { AxiosResponse } from 'axios';
import Education from './education.entity';

export default class EducationService {

  public async loadEducations(): Promise<Education[]> {
    let educations: Education[] = [];
    await Axios.get('/api/educations/').then((response: AxiosResponse) => {
      educations = response.data as Education[];
    });
    return educations;
  }

  public async createEducation(education:Education): Promise<Education> {
    await Axios.post('/api/educations/create',Education).then((response: AxiosResponse) => {
      education = response.data as Education;
    });
    return education;
  }

  public async updateEducation(education:Education): Promise<Education> {
    await Axios.patch('/api/educations/update',education).then((response: AxiosResponse) => {
      education = response.data as Education;
    });
    return education;
  }
}