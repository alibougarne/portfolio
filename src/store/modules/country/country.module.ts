import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules';

@Module
class EducationModule extends VuexModule {
  // state
  public educations: Education[] = [];
  private educationService: EducationService = new EducationService();
  // mutations
  @Mutation
  private setEducation(educations: Education[]) {
    this.educations = educations;
  }
  // getters
  // 😅 not yet
  // actions
  @Action
  public async loadEducation() {
    let educations: Education[] = [];
    console.log(
      '%c⧭ educations before load is 💩 ==> ',
      'color: #f2ceb6',
      educations
    );
    educations = await this.educationService.loadEducations();
    console.log('%c⧭ educations after load is 🍏', 'color: #00e600', educations);
    this.setEducation(educations);
    // return Education;
  }
}

// register module (could be in any file 😅)
import store from '@/store/index';
import Education from './country.entity';
import EducationService from './country.service';
export const educationModule = new EducationModule({ store, name: 'education' });
