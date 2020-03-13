import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules';

@Module
class JobModule extends VuexModule {
  // state
  public jobs: Job[] = [];
  private jobService: JobService = new JobService();
  // mutations
  @Mutation
  private setJob(jobs: Job[]) {
    this.jobs = jobs;
  }
  // getters
  // 😅 not yet
  // actions
  @Action
  public async loadJob() {
    let jobs: Job[] = [];
    console.log(
      '%c⧭ jobs before load is 💩 ==> ',
      'color: #f2ceb6',
      jobs
    );
    jobs = await this.jobService.loadJobs();
    console.log('%c⧭ jobs after load is 🍏', 'color: #00e600', jobs);
    this.setJob(jobs);
    // return Job;
  }
}

// register module (could be in any file 😅)
import store from '@/store/index';
import Job from './job.entity';
import JobService from './job.service';
export const jobModule = new JobModule({ store, name: 'job' });
