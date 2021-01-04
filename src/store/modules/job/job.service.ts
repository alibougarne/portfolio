import Axios, { AxiosResponse } from 'axios';
import Job from './job.entity';

export default class JobService {

  public async loadJobs(): Promise<Job[]> {
    let jobs: Job[] = [];
    await Axios.get('/api/jobs/').then((response: AxiosResponse) => {
      jobs = response.data as Job[];
    });
    return jobs;
  }

  public async createJob(job:Job): Promise<Job> {
    await Axios.post('/api/jobs/create',Job).then((response: AxiosResponse) => {
      job = response.data as Job;
    });
    return job;
  }

  public async updateJob(job:Job): Promise<Job> {
    await Axios.patch('/api/jobs/update',job).then((response: AxiosResponse) => {
      job = response.data as Job;
    });
    return job;
  }
}