import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container footer-content">
        <p> Gerardo_Mundo_Dev, {{ currentYear }}.</p>
        <p>All rights reserved &copy;</p>
        <p class="built-with">
          Built with <span class="accent">Angular</span> &amp; <span class="accent">Three.js</span>
        </p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      border-top: 1px solid var(--border-color);
      padding: 2rem 0;
      margin-top: 4rem;
      background: var(--bg-secondary);
    }
    .footer-content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      justify-content: center;
      align-items: center;
      color: var(--text-secondary);
      font-size: 0.9rem;
    }
    .built-with {
      .accent {
        color: var(--accent-color);
        font-weight: 600;
      }
    }
    
    @media (max-width: 768px) {
      .footer-content {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {
  protected readonly currentYear = new Date().getFullYear();
}
