import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules';

@Module
class ContactModule extends VuexModule {
  // state
  public contact: Contact = new Contact();
  private contactService: ContactService = new ContactService();
  // mutations
  @Mutation
  private setContact(contact: Contact) {
    this.contact = contact;
  }
  // getters
  // 😅 not yet
  // actions
  @Action
  public async loadContact() {
    let contact: Contact = new Contact();
    console.log(
      '%c⧭ contact before load is 💩 ==> ',
      'color: #f2ceb6',
      contact
    );
    console.log('', contact);
    contact = await this.contactService.loadContact();
    console.log('%c⧭ contact after load is 🍏', 'color: #00e600', contact);
    this.setContact(contact);
    // return contact;
  }
}

// register module (could be in any file 😅)
import store from '@/store/index';
import Contact from './education.entity';
import ContactService from './education.service';
export const contactModule = new ContactModule({ store, name: 'contact' });
