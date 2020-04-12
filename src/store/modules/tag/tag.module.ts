import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules';
import Tag from './tag.entity'
import TagService from './tag.service';

@Module
class TagModule extends VuexModule {
  // state
  public tags:Tag[]=[];
  private tagService:TagService = new TagService;
  // mutations
  @Mutation
  private setTags(tags:Tag[]) {
    this.tags = tags;
  }
  // getters
  public get allTags():Tag[]{
    return this.tags;
  }
  // actions
  @Action
  public async loadTags():Promise<Tag[]>{
    let tags:Tag[]=[]
    console.log('before load', tags)
    tags = await this.tagService.loadTags();
    console.log('after load', tags)
    this.setTags(tags);
    return tags;
  }

  @Action
  public async createTag(formData:FormData):Promise<AxiosResponse>{
    return await this.tagService.createTag(formData);
  }

  @Action
  public async editTag(formData:FormData):Promise<AxiosResponse>{
    return await this.tagService.editTag(formData);
  }

  @Action
  public async deleteTag(tagId:string):Promise<AxiosResponse>{
    return await this.tagService.deleteTag(tagId);
  }
}

// register module (could be in any file)
import store from '@/store/index';
import { AxiosResponse } from 'axios';
export const tagModule = new TagModule({ store, name: 'tag' });