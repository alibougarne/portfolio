import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules';
import Tag from './tag.entity'
import TagService from './tag.service';

@Module
class TagModule extends VuexModule {
  // state
  // mutations

  // getters
  // actions
  @Action
  public async loadTags():Promise<Tag[]>{
    let tags:Tag[]=[]
    tags = await TagService.loadTags();
    return tags;
  }

  @Action
  public async getTagImage(image:string):Promise<string>{
    return await TagService.getTagImage(image);
  }

  @Action
  public async createTag(formData:FormData):Promise<AxiosResponse>{
    return await TagService.createTag(formData);
  }

  @Action
  public async editTag(formData:FormData):Promise<AxiosResponse>{
    return await TagService.editTag(formData);
  }

  @Action
  public async deleteTag(tagId:string):Promise<AxiosResponse>{
    return await TagService.deleteTag(tagId);
  }
}

// register module (could be in any file)
import store from '@/store/index';
import { AxiosResponse } from 'axios';
export const tagModule = new TagModule({ store, name: 'tag' });