import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.registerPlugin(TextPlugin);
    }
  }

  getGsap() {
    return gsap;
  }

  getScrollTrigger() {
    return ScrollTrigger;
  }
}
