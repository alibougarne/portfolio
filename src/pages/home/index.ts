import Vue from 'vue';
import Component from 'vue-class-component';
import gsap from 'gsap';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';
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
    NET({
      el: '.bg-home',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xebd80e,
      backgroundColor: 0x0,
      // mouseControls: true,
      // touchControls: true,
      // gyroControls: false,
      // minHeight: 200.00,
      // minWidth: 200.00,
      // scale: 1.00,
      // scaleMobile: 1.00,
      // backgroundColor: 0x0,
      // color1: 0xfff000,
      // color2: 0xffffff,
      // birdSize: 0.90,
      // wingSpan: 18.00,
      // separation: 55.00,
      // alignment: 13.00,
      // cohesion: 37.00,
      // quantity: 3.00,

      THREE
    });
  }
}
