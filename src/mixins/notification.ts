import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class NotificationMixin extends Vue {
  notify(
    color: string,
    textColor: string,
    icon: string,
    message: string
  ): void {
    this.$q.notify({
      color,
      textColor,
      icon,
      message
    });
  }
}
