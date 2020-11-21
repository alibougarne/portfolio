import Vue from 'vue';
import Component from 'vue-class-component';
import gsap from 'gsap';

@Component
export default class Home extends Vue {
    mounted(){
        // this.$nextTick(function() {
            let tl = gsap.timeline();
            tl.from('.display--group', {
                duration: .4,
                scale: 0.5,
                display:'none',
                opacity: 0,
                delay: 0.5,
                stagger: 0.2,
                ease: 'elastic',
                force3D: false
              }).from('.txt.anim-text-flow .animate--span', {
              duration: 2,
              scale: 0.5,
              display:'none',
              opacity: 0,
              delay: 0,
              stagger: 0.1,
              ease: 'elastic',
              force3D: false
            }).from('.first-to--display', {
                duration: .5,
                scale: 0.5,
                display:'none',
                opacity: 0,
                delay: 0.1,
                stagger: 0.1,
                ease: 'elastic',
                force3D: false
              }).from('.br-to--display', {
                duration: .3,
                scale: 0.5,
                display:'none',
                opacity: 0,
                delay: 0.2,
                stagger: 0.1,
                ease: 'elastic',
                force3D: false
              }).from('.to--display', {
                duration: .5,
                scale: 0.5,
                display:'none',
                opacity: 0,
                delay: 0.3,
                stagger: 0.1,
                ease: 'elastic',
                force3D: false
              }).from('.last-to--display', {
                duration: 2,
                scale: 0.5,
                display:'none',
                opacity: 0,
                delay: 0.5,
                stagger: 0.3,
                ease: 'elastic',
                force3D: false
              }).to('.display--group', {
                duration: .5,
                delay: 0.2,
                paddingLeft:'15px',
                force3D: false
              });
            // this.$el.childNodes.forEach((element:ChildNode,index:number) => {
            //   console.log('%c⧭', 'color: #f200e2', element);
            // });
          // });
    }
}