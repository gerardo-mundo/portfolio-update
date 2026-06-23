import { Component, OnInit, ElementRef, AfterViewInit, PLATFORM_ID, Inject, ViewChildren, QueryList } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DataService, Experience } from '../../core/services/data.service';
import { AnimationService } from '../../core/services/animation.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="experience-section container" id="experience">
      <h2 class="section-title"><span>03.</span> Experience</h2>
      
      <div class="timeline">
        <div class="timeline-item" *ngFor="let exp of experiences" #timelineItem>
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <span class="date">{{ exp.date }}</span>
            <h3 class="title">{{ exp.title }}</h3>
            <h4 class="company">{{ exp.company }}</h4>
            <p class="description">{{ exp.description }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .experience-section {
      padding: 100px 2rem;
    }
    .timeline {
      position: relative;
      max-width: 800px;
      margin: 0 auto;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 20px;
        height: 100%;
        width: 2px;
        background: var(--border-color);
      }
    }
    .timeline-item {
      position: relative;
      margin-bottom: 3rem;
      padding-left: 60px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    .timeline-dot {
      position: absolute;
      left: 14px;
      top: 5px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--accent-color);
      box-shadow: 0 0 10px rgba(17, 195, 89, 0.5);
    }
    .timeline-content {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.5rem 2rem;
      transition: transform 0.3s ease, border-color 0.3s ease;
      
      &:hover {
        transform: translateX(5px);
        border-color: var(--accent-color);
      }
    }
    .date {
      display: inline-block;
      font-size: 0.9rem;
      color: var(--accent-color);
      font-family: monospace;
      margin-bottom: 0.5rem;
    }
    .title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }
    .company {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-secondary);
      margin-bottom: 1rem;
    }
    .description {
      color: var(--text-secondary);
      line-height: 1.6;
    }
    
    @media (max-width: 768px) {
      .timeline::before { left: 10px; }
      .timeline-dot { left: 4px; }
      .timeline-item { padding-left: 40px; }
      .timeline-content { padding: 1.5rem; }
    }
  `]
})
export class ExperienceComponent implements OnInit, AfterViewInit {
  experiences: Experience[] = [];
  @ViewChildren('timelineItem') timelineItems!: QueryList<ElementRef>;
  private isBrowser: boolean;

  constructor(
    private dataService: DataService,
    private animationService: AnimationService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.experiences = this.dataService.experiences();
  }

  ngAfterViewInit() {
    if (this.isBrowser && this.timelineItems.length > 0) {
      const gsap = this.animationService.getGsap();
      const ScrollTrigger = this.animationService.getScrollTrigger();
      
      this.timelineItems.forEach((item, index) => {
        gsap.fromTo(item.nativeElement,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item.nativeElement,
              start: 'top 85%'
            }
          }
        );
      });
    }
  }
}
