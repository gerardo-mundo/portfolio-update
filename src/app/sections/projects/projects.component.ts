import { Component, OnInit, ElementRef, AfterViewInit, PLATFORM_ID, Inject, ViewChildren, QueryList } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DataService, Project } from '../../core/services/data.service';
import { AnimationService } from '../../core/services/animation.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="projects-section container" id="projects">
      <h2 class="section-title"><span>04.</span> Some Things I've Built</h2>
      
      <div class="projects-grid">
        <div class="project-card" *ngFor="let project of projects" #projectCard>
          <div class="project-content">
            <div class="project-top">
              <div class="folder-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div class="project-links">
                <a href="#" aria-label="GitHub Link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
              </div>
            </div>
            <h3 class="project-title">{{ project.title }}</h3>
            <div class="project-description">
              <p>{{ project.description }}</p>
            </div>
          </div>
          <ul class="project-tech-list">
            <li *ngFor="let tech of project.technologies">{{ tech }}</li>
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects-section {
      padding: 100px 2rem;
    }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }
    .project-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 2rem 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-8px);
        border-color: var(--accent-color);
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        
        .project-title {
          color: var(--accent-color);
        }
      }
    }
    .project-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .folder-icon {
      svg {
        width: 40px;
        height: 40px;
      }
    }
    .project-links {
      a {
        color: var(--text-secondary);
        transition: color 0.2s ease;
        
        svg {
          width: 20px;
          height: 20px;
        }
        
        &:hover {
          color: var(--accent-color);
        }
      }
    }
    .project-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
      transition: color 0.3s ease;
    }
    .project-description {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .project-tech-list {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      list-style: none;
      padding: 0;
      
      li {
        font-family: monospace;
        font-size: 0.8rem;
        color: var(--text-secondary);
      }
    }
  `]
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  projects: Project[] = [];
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;
  private isBrowser: boolean;

  constructor(
    private dataService: DataService,
    private animationService: AnimationService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.projects = this.dataService.projects();
  }

  ngAfterViewInit() {
    if (this.isBrowser && this.projectCards.length > 0) {
      const gsap = this.animationService.getGsap();
      const ScrollTrigger = this.animationService.getScrollTrigger();
      
      const elements = this.projectCards.map(card => card.nativeElement);
      
      gsap.fromTo(elements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 85%'
          }
        }
      );
    }
  }
}
