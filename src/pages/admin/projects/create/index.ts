import Vue from 'vue';
import Component from 'vue-class-component';
import Project from '@/store/modules/project/project.entity';
import { Common } from '@/store/modules/common/common.entity';
import { AxiosResponse } from 'axios';
import { projectModule } from '@/store/modules/project/project.module';
import { tagModule } from '@/store/modules/tag/tag.module';
import { Emit, Mixins, Prop, PropSync, Watch } from 'vue-property-decorator';
import ButtonMixin from '@/mixins/buttons';
import Tag from '@/store/modules/tag/tag.entity';
import Company from '@/store/modules/company/company.entity';
import { companyModule } from '@/store/modules/company/company.module';
@Component({
  components: {}
})
export default class CreateProject extends Mixins(ButtonMixin) {
  @Prop()
  private project!: Project;
  @PropSync('name', { type: String }) syncedName!: string;
  private isCreatingProject: boolean = false;
  private projectImage: File = new File([''], 'image.png', {
    type: 'image/png'
  });
  private canSaveProject: boolean = false;
  public contentStyle: object = {};
  public contentActiveStyle: object = {};
  private tags: Tag[] = [];
  private companies: Company[] = [];

  public thumbStyle: object = {
    right: '2px',
    borderRadius: '0px',
    backgroundColor: 'darkgoldenrod',
    width: '5px',
    opacity: 0.75
  };
  // get inputsWrapperHeight(){
  //   return (document as any).querySelector(".project--inputs").offsetHeight;
  // }

  get inputs(): string[] {
    return (
      Object.keys(new Project())
        // .filter(input => ![ 'id', 'logoPath'].includes(input))
        .filter(
          input =>
            [
              ...Object.keys(new Common()),
              'tagIds',
              'categoryId',
              'companyId',
              'description',
            ].indexOf(input) < 0
        )
    );
  }

  get link_API(): string {
    return process.env.API || '';
  }

  @Emit('emission-from-child')
  emitProjectToProjectsList(project: Project) {}

  checkFile(e: any) {
    console.log('%c⧭ file Uploaaader ===> ', 'color: #bfffc8', e);
  }

  checkFileType(files: any) {
    console.log('%c⧭ files', 'color: #1d3f73', files);
    if (files.filter((files: any) => files.type === 'image/png')) {
      this.projectImage = files[0];
      console.log('%c⧭', 'color: #cc0088', this.projectImage);
    }
    return files.filter((files: any) => files.type === 'image/png');
  }

  @Watch('projectImage', { immediate: true, deep: true })
  @Watch('project', { immediate: true, deep: true })
  canSave(newValue: Project, oldvalue: Project) {
    if (oldvalue) {
      this.canSaveProject = true;
    }
  }

  private async saveProject() {
    this.isCreatingProject = true;
    const formData = new FormData();
    formData.append('projectImage', this.projectImage);
    formData.append('project', JSON.stringify(this.project));
    try {
      let response: AxiosResponse = this.project.id
        ? await projectModule.editProject(formData)
        : await projectModule.createProject(formData);
      console.log(
        '%c⧭ create/edit project response : ===> ',
        'color: #aa00ff',
        response
      );
      if (response.data) {
        if (
          response.data &&
          (response.status === 201 || response.status === 200)
        ) {
          this.emitProjectToProjectsList(<Project>response.data);
          this.startComputing(300);
          setTimeout(() => {
            this.isCreatingProject = false;
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: `Project ${
                this.project.id ? 'edited' : 'saved'
              } successfully !`
            });
          }, 900);
        } else {
          setTimeout(() => {
            this.isCreatingProject = false;
            this.$q.notify({
              color: 'red',
              textColor: 'white',
              icon: 'cloud_done',
              message: `${
                this.project.id ? 'editing' : 'saving'
              } project failed`
            });
          }, 900);
        }
      }
    } catch (error) {
      setTimeout(() => {
        this.isCreatingProject = false;
        this.$q.notify({
          color: 'red',
          textColor: 'white',
          icon: 'cloud_done',
          message: `${
            this.project.id ? 'editing' : 'saving'
          } project failed,error server, please try later`
        });
      }, 900);
    }
  }

  private onReset() {
    this.project = new Project();
    this.projectImage = new File([''], 'image.png', { type: 'image/png' });
  }
  public async mounted(): Promise<void> {
    this.tags = await tagModule.loadTags();
    console.log('%c⧭ 📎this.tags ===> ', 'color: #00258c', this.tags);
    this.companies = await companyModule.loadCompanies();
  }
}
