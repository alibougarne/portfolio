import Tag from './tag.entity';
import Axios, { AxiosResponse } from 'axios';

export default class TagService {

  static async loadTags(): Promise<Tag[]> {
    let tags: Tag[] = [];
    await Axios.get('/api/tags/all').then((response: AxiosResponse) => {
      tags = response.data as Tag[];
      // console.log(response.data);
    });
    // tags.map(async tag => {
    //   tag.cloudImageUrl = await this.getTagImage(tag.logoPath || '');
    //   return tag
    // });
    return tags
  }

  static async getTagImage(imageName: string) :Promise<string> {
    let url = ""
     await Axios.get(`/api/images/${imageName}?target=tags`)
      .then(res => {
        url = res.data;
      })
      .catch(err => {
        return Promise.reject(err);
      });
    return url;
  }

  static async createTag(formData: FormData): Promise<AxiosResponse> {
    return await Axios.post('/api/tags/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  static async editTag(formData: FormData): Promise<AxiosResponse> {
    return await Axios.put('/api/tags/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  static async deleteTag(tagId: string): Promise<AxiosResponse> {
    return await Axios.delete(`/api/tags/${tagId}`);
  }
}
