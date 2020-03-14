import Vue from 'vue';
import Component from 'vue-class-component';
@Component({
  components: {  }
})
export default class Login extends Vue {
  private login: object = {
    email: '',
    password: ''
  }
  public mounted(): void {
    // this.$q.loading.show({
    //   delay: 400 // ms
    // });
  }
}