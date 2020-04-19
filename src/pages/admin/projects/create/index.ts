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
import Category from '@/store/modules/category/category.entity';
import { categoryModule } from '@/store/modules/category/category.module';
@Component({
  components: {}
})
export default class CreateProject extends Mixins(ButtonMixin) {
  @Prop()
  private project!: Project;
  @PropSync('name', { type: String }) syncedName!: string;
  private isCreatingProject: boolean = false;
  private projectImages: any = [];
  private canSaveProject: boolean = false;
  public contentStyle: object = {};
  public contentActiveStyle: object = {};
  private tags: Tag[] = [];
  private companies: Company[] = [];
  private categories: Category[] = [];
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

  // get inputs(): string[] {
  //   return (
  //     Object.keys(new Project())
  //       // .filter(input => ![ 'id', 'logoPath'].includes(input))
  //       .filter(
  //         input =>
  //           [
  //             ...Object.keys(new Common()),
  //             'tagIds',
  //             'tags',
  //             'categoryId',
  //             'companyId',
  //             'description',
  //             'beginDate',
  //             'endDate',
  //           ].indexOf(input) < 0
  //       )
  //   );
  // }

  get link_API(): string {
    return process.env.API || '';
  }

  @Emit('emission-from-create-project')
  emitProjectToProjectsList(project: string) {
    console.log('%c⧭ project emited', 'color: #733d00', project);
  }

  checkFile(e: any) {
    // console.log('%c⧭ file Uploaaader ===> ', 'color: #bfffc8', e);
  }

  checkFileType(files: any) {
    if (files.filter((files: any) => files.type === 'image/png')) {
      files
        .filter((files: any) => files.type === 'image/png')
        .forEach((file: File) => {
          if (
            !this.projectImages.filter(
              (image: any) => image.file.name === file.name
            ).length
          ) {
            this.projectImages.push({
              selected: !this.projectImages.length,
              file
            });
          }
        });
      this.project.mainImage = this.projectImages.filter(
        (image: any) => image.selected
      )[0].file.name;
    }
    return files.filter((files: any) => files.type === 'image/png');
  }

  get checkIfCanSaveProject() {
    this.canSaveProject = !!this.projectImages || !!this.project.id;
    return this.canSaveProject;
  }
  private async saveProject() {
    this.isCreatingProject = true;
    const formData = new FormData();
    // console.log('%c⧭ 🎭this.projectImages ===> ', 'color: #8c0038', this.projectImages);
    this.projectImages.forEach((projectImage: any, index: number) => {
      formData.append('image', projectImage.file);
    });
    formData.append('project', JSON.stringify(this.project));
    try {
      let response: AxiosResponse = this.project.id
        ? await projectModule.editProject(formData)
        : await projectModule.createProject(formData);
      // console.log(
      //   '%c⧭ create/edit project response : ===> ',
      //   'color: #aa00ff',
      //   response
      // );
      if (response.data) {
        if (
          response.data &&
          (response.status === 201 || response.status === 200)
        ) {
          console.log('%c⧭ response.data when create project', 'color: #e50000', JSON.parse(JSON.stringify(response.data)));
          this.emitProjectToProjectsList(JSON.stringify(response.data));
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
    this.projectImages = [];
  }
  public async mounted(): Promise<void> {
    this.tags = await tagModule.loadTags();
    console.log('%c⧭ 📎this.tags ===> ', 'color: #00258c', this.tags);
    this.companies = await companyModule.loadCompanies();
    console.log('%c⧭ 🏛this.companies ===> ', 'color: #7f2200', this.companies);
    this.categories = await categoryModule.loadCategories();
    console.log(
      '%c⧭ 🚀 this.categories ===> ',
      'color: #e5de73',
      this.categories
    );
  }
}
