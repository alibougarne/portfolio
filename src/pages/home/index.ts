import Vue from 'vue';
import Component from 'vue-class-component';
import gsap from 'gsap';
import * as THREE from 'three';
import WAVES from 'vanta/dist/vanta.waves.min';
@Component
export default class Home extends Vue {
  vantaEffect: any;
  async mounted() {
    // this.$nextTick(function() {
    let tl = gsap.timeline();
    tl.from('.display--group', {
      duration: 0.4,
      scale: 0.5,
      display: 'none',
      opacity: 0,
      delay: 0.5,
      stagger: 0.2,
      ease: 'elastic',
      force3D: false
    })
      .from('.txt.anim-text-flow .animate--span', {
        duration: 2,
        scale: 0.5,
        display: 'none',
        opacity: 0,
        delay: 0,
        stagger: 0.1,
        ease: 'elastic',
        force3D: false
      })
      .from('.first-to--display', {
        duration: 0.5,
        scale: 0.5,
        display: 'none',
        opacity: 0,
        delay: 0.1,
        stagger: 0.1,
        ease: 'elastic',
        force3D: false
      })
      .from('.br-to--display', {
        duration: 0.3,
        scale: 0.5,
        display: 'none',
        opacity: 0,
        delay: 0.2,
        stagger: 0.1,
        ease: 'elastic',
        force3D: false
      })
      .from('.to--display', {
        duration: 0.5,
        scale: 0.5,
        display: 'none',
        opacity: 0,
        delay: 0.3,
        stagger: 0.1,
        ease: 'elastic',
        force3D: false
      })
      .from('.last-to--display', {
        duration: 2,
        scale: 0.5,
        display: 'none',
        opacity: 0,
        delay: 0.5,
        stagger: 0.3,
        ease: 'elastic',
        force3D: false
      })
      .to('.display--group', {
        duration: 0.5,
        delay: 0.2,
        paddingLeft: '15px',
        force3D: false
      });
    if (
      (document as any).querySelector('.q-layout').classList.contains('bg-home')
    ) {
      this.vantaEffect = WAVES({
        el: '.bg-home',
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x0,
        THREE
      });
    }
  }

  explodeArray(array: any[], explode:number ):string{
    let a: any = [],
      b: any = [];
      array.forEach((x, i) => {
      !(i % explode) && (b = []);
      b.push(x);
      (b.length === explode || array.length === i + 1) && a.push(b);
    });
    return JSON.stringify(a);
  }
  beforeDestroy() {
    if (this.vantaEffect) this.vantaEffect.destroy();
    const arr= [1, 2, 3, 4, 5], explode = 2;
    console.log(`%c⧭ explode ${JSON.stringify(arr)} to arrays of ${explode} pieces, just here ! ===> `, 'color: #99adcc', this.explodeArray(arr,explode));
  }

}
