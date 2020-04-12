import Vue from 'vue';
import Component from 'vue-class-component';
import Project from '@/store/modules/project/project.entity';
import { Common } from '@/store/modules/common/common.entity';
import { AxiosResponse } from 'axios';
import { projectModule } from '@/store/modules/project/project.module';
import { Emit, Mixins, Prop, PropSync, Watch } from 'vue-property-decorator';
import ButtonMixin from '@/mixins/buttons';
@Component({
  components: {}
})
export default class CreateProject extends Mixins(ButtonMixin) {
  
  @Prop()
  private project!: Project;
  @PropSync('name', { type: String }) syncedName!: string;
  private isCreatingProject: boolean = false;
  private projectImage: File =  new File([''], 'image.png', { type: 'image/png' });
  private canSaveProject: boolean = false;
  public contentStyle: object = {};
  public contentActiveStyle: object = {};
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
        // .filter(
        //   input =>
        //     [
        //       ...Object.keys(new Common()),
        //       'textColor',
        //       'backgroundColor',
        //       'description'
        //     ].indexOf(input) < 0
        // )
    );
  }

  get imageLink():string{
    return process.env.API || "";
  }
  
  @Emit('emission-from-child')
  emitProjectToProjectsList(project: Project) {}

  checkFile(e:any){
    console.log('%c⧭ file Uploaaader ===> ', 'color: #bfffc8', e);
  }

  checkFileType (files:any) {
    console.log('%c⧭ files', 'color: #1d3f73', files);
    if (files.filter((files:any) => files.type === 'image/png')){
      this.projectImage = files[0];
      console.log('%c⧭', 'color: #cc0088', this.projectImage);
    }
    return files.filter((files:any) => files.type === 'image/png')
  }

  @Watch('projectImage', { immediate: true, deep: true })
  @Watch('project', { immediate: true, deep: true })
  canSave( newValue:Project, oldvalue:Project){
    if(oldvalue){
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
        if (response.data && (response.status === 201 || response.status === 200 ) ) {
          this.emitProjectToProjectsList(<Project>response.data);
          this.startComputing(300);
          setTimeout(() => {
            this.isCreatingProject = false;
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: `Project ${this.project.id?'edited':'saved'} successfully !`
            });
          }, 900);
        } else {
          setTimeout(() => {
            this.isCreatingProject = false;
            this.$q.notify({
              color: 'red',
              textColor: 'white',
              icon: 'cloud_done',
              message: `${this.project.id?'editing':'saving'} project failed`
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
          message: `${this.project.id?'editing':'saving'} project failed,error server, please try later`
        });
      }, 900);
    }
  }

  private onReset() {
    this.project = new Project();
    this.projectImage = new File([''], 'image.png', { type: 'image/png' });
  }
  public async mounted(): Promise<void> {
    console.log('%c⧭ this.inputs ====> ', 'color: #99adcc', this.inputs);
    // console.log(this.projectImage);
    if(this.project.id){
      // this.projectImage.src = `${this.imageLink}/projects/image/${this.project.logoPath}`
      // this.projectImage.alt = this.project.logoPath

    }
    // this.syncedName = 'merssssss';
    // console.log('%c⧭ name ====> ', 'color: #006dcc', this.syncedName);
    // this.projects = await projectModule.loadProjects();
  }
}
