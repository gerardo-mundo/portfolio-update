import { Component, OnInit, ElementRef, AfterViewInit, PLATFORM_ID, Inject, ViewChildren, QueryList } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DataService, Technology } from '../../core/services/data.service';
import { AnimationService } from '../../core/services/animation.service';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="tech-section container" id="technologies">
      <h2 class="section-title"><span>02.</span> Technologies</h2>
      <p class="section-subtitle">The tools and frameworks I use daily to build robust software.</p>
      
      <div class="tech-grid">
        <div class="tech-card" *ngFor="let tech of technologies" #techCard>
          <div class="tech-icon-placeholder">
             <i [class]="tech.iconClass" class="colored"></i>
          </div>
          <span class="tech-name">{{ tech.name }}</span>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .tech-section {
      padding: 100px 2rem;
    }
    .section-subtitle {
      color: var(--text-secondary);
      margin-bottom: 3rem;
      font-size: 1.1rem;
    }
    .tech-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 2rem;
    }
    .tech-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 2rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      transition: all 0.3s ease;
      cursor: pointer;
      
      &:hover {
        transform: translateY(-5px);
        border-color: var(--accent-color);
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        
        .tech-name {
          color: var(--accent-color);
        }
        
        .tech-icon-placeholder {
          background: var(--accent-color);
          color: #000;
        }
      }
    }
    .tech-icon-placeholder {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: var(--bg-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--text-primary);
      transition: all 0.3s ease;
      
      img {
        width: 32px;
        height: 32px;
      }
    }
    .tech-name {
      font-weight: 600;
      color: var(--text-primary);
      transition: color 0.3s ease;
    }
  `]
})
export class TechnologiesComponent implements OnInit, AfterViewInit {
  technologies: Technology[] = [];
  @ViewChildren('techCard') techCards!: QueryList<ElementRef>;
  private isBrowser: boolean;

  constructor(
    private dataService: DataService,
    private animationService: AnimationService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.technologies = this.dataService.technologies();
  }

  ngAfterViewInit() {
    if (this.isBrowser && this.techCards.length > 0) {
      const gsap = this.animationService.getGsap();
      const ScrollTrigger = this.animationService.getScrollTrigger();
      
      const elements = this.techCards.map(card => card.nativeElement);
      
      gsap.fromTo(elements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.tech-grid',
            start: 'top 80%'
          }
        }
      );
    }
  }
}
