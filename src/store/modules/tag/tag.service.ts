import Tag from './tag.entity';
import Axios, { AxiosResponse } from 'axios';

export default class TagService {
  public async loadTags(): Promise<Tag[]> {
    let tags: Tag[] = [];
    await Axios.get('/api/tags/all').then((response: AxiosResponse) => {
      tags = response.data as Tag[];
      console.log(response.data);
    });
    return tags;
  }

  async createTag(formData: FormData): Promise<AxiosResponse> {
    return await Axios.post('/api/tags/create/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
  async deleteTag(tagId: string): Promise<AxiosResponse> {
    return await Axios.delete(`/api/tags/delete/${tagId}`);
  }
}
