import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class ButtonMixin extends Vue {
  loadingPercentage: number = 0;
  interval: NodeJS.Timeout | any;
  isProcessing: boolean = false;


  startComputing(repeatTime: number) {
    this.loadingPercentage = 0;
    this.interval = setInterval(() => {
      this.loadingPercentage += Math.floor(Math.random() * 8 + 10);
      if (this.loadingPercentage >= 100) {
        clearInterval(this.interval);
      }
    }, repeatTime);
  }
}
