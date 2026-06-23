import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar" [class.menu-open]="isMenuOpen()">
      <div class="container nav-content">
        <div class="brand">
          <svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
          <span class="brand-name">Gerardo_Mundo_Dev</span>
        </div>
        
        <!-- Desktop Nav Links -->
        <div class="nav-links">
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#technologies">Technologies</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
        </div>

        <div class="nav-actions">
          <div class="social-links">
            <a href="https://www.linkedin.com/in/gerardo-mundo/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="https://github.com/gerardo-mundo" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="https://x.com/El_Osario" target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4l16 16m0-16L4 20" /></svg>
            </a>
          </div>
          
          <button class="theme-toggle" (click)="themeService.toggleTheme()" aria-label="Toggle Theme">
            <svg *ngIf="themeService.isDarkMode()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            <svg *ngIf="!themeService.isDarkMode()" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          </button>

          <!-- Hamburger Toggle -->
          <button class="hamburger" (click)="toggleMenu()" aria-label="Toggle Menu">
            <span class="bar" [class.open]="isMenuOpen()"></span>
            <span class="bar" [class.open]="isMenuOpen()"></span>
            <span class="bar" [class.open]="isMenuOpen()"></span>
          </button>
        </div>
      </div>

      <!-- Mobile Overlay Menu -->
      <div class="mobile-menu-overlay" [class.open]="isMenuOpen()">
        <div class="mobile-nav-links">
          <a href="#hero" (click)="closeMenu()">Home</a>
          <a href="#about" (click)="closeMenu()">About</a>
          <a href="#technologies" (click)="closeMenu()">Technologies</a>
          <a href="#experience" (click)="closeMenu()">Experience</a>
          <a href="#projects" (click)="closeMenu()">Projects</a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      width: 100%;
      background: rgba(var(--bg-color), 0.8);
      backdrop-filter: blur(10px);
      z-index: 1000;
      border-bottom: 1px solid var(--border-color);
      transition: background 0.3s ease;
      
      &.menu-open {
        background: var(--bg-color);
        border-bottom: none;
      }
    }
    .nav-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80px;
      position: relative;
      z-index: 1001; /* Keep above overlay */
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 800;
      font-size: 1.25rem;
      color: var(--text-primary);
    }
    .brand-icon {
      width: 28px;
      height: 28px;
      color: var(--accent-color);
    }
    .nav-links {
      display: flex;
      gap: 2rem;
      
      a {
        font-weight: 600;
        font-size: 0.95rem;
        transition: color 0.2s;
        
        &:hover {
          color: var(--accent-color);
        }
      }
    }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    .social-links {
      display: flex;
      gap: 1rem;
      
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        transition: all 0.2s;
        
        svg {
          width: 18px;
          height: 18px;
        }
        
        &:hover {
          background: var(--accent-color);
          color: #000;
          border-color: var(--accent-color);
        }
      }
    }
    .theme-toggle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-primary);
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      transition: all 0.2s;
      
      svg {
        width: 20px;
        height: 20px;
      }
      
      &:hover {
        background: var(--card-hover);
      }
    }
    
    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      cursor: pointer;
      border: none;
      background: none;
      padding: 5px;
      
      .bar {
        width: 25px;
        height: 3px;
        background-color: var(--text-primary);
        border-radius: 3px;
        transition: all 0.3s ease;
        
        &.open:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        &.open:nth-child(2) {
          opacity: 0;
        }
        &.open:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }
      }
    }

    .mobile-menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: var(--bg-color);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      z-index: 1000;

      &.open {
        opacity: 1;
        pointer-events: auto;
      }
    }

    .mobile-nav-links {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
      text-align: center;
      
      a {
        font-size: 2rem;
        font-weight: 700;
        color: var(--text-primary);
        transition: color 0.2s ease;
        
        &:hover {
          color: var(--accent-color);
        }
      }
    }
    
    @media (max-width: 900px) {
      .nav-links {
        display: none;
      }
      .hamburger {
        display: flex;
      }
      /* Optional: Hide social links in mobile nav bar to save space, keeping only theme + hamburger */
      .social-links {
        display: none;
      }
    }
  `]
})
export class NavbarComponent {
  themeService = inject(ThemeService);
  isMenuOpen = signal<boolean>(false);

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
    if (this.isMenuOpen()) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    document.body.style.overflow = 'auto';
  }
}
