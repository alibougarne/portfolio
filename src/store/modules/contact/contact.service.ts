import Axios, { AxiosResponse } from 'axios';
import Contact from './contact.entity';

export default class ContactService {

  public async loadContact(): Promise<Contact> {
    let contact: Contact = new Contact;
    await Axios.get('/api/contacts/').then((response: AxiosResponse) => {
      contact = response.data as Contact;
      console.log(response.data);
    });
    return contact;
  }

  public async createContact(contact:Contact): Promise<Contact> {
    await Axios.post('/api/contacts/create',contact).then((response: AxiosResponse) => {
      contact = response.data as Contact;
      console.log(response.data);
    });
    return contact;
  }

  public async updateContact(contact:Contact): Promise<Contact> {
    await Axios.patch('/api/contacts/update',contact).then((response: AxiosResponse) => {
      contact = response.data as Contact;
      console.log(response.data);
    });
    return contact;
  }
}