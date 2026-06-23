import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { TechnologiesComponent } from './sections/technologies/technologies.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    TechnologiesComponent,
    ExperienceComponent,
    ProjectsComponent
  ],
  template: `
    <app-navbar></app-navbar>
    <main>
      <app-hero></app-hero>
      <app-about></app-about>
      <app-technologies></app-technologies>
      <app-experience></app-experience>
      <app-projects></app-projects>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    main {
      width: 100%;
    }
  `]
})
export class App implements OnInit {
  // Inject theme service so it initializes the theme on app start
  private themeService = inject(ThemeService);

  ngOnInit() {
    // Optional: add smooth scrolling to all anchors
    document.querySelectorAll('a[href^="#"]').forEach((anchor: Element) => {
      anchor.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }
}
