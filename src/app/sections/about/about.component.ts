import { Component, ElementRef, AfterViewInit, PLATFORM_ID, Inject, ViewChild, OnDestroy, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AnimationService } from '../../core/services/animation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="about-section container" id="about">
      <h2 class="section-title"><span>01.</span> About Me</h2>
      
      <div class="about-content" #aboutContent>
        <div class="about-text">
          <p>
            Hello! My name is Gerardo and I enjoy creating things that live on the internet. 
            My interest in software development started back when I built my first small web projects, 
            which taught me a lot about HTML, CSS, and basic programming logic.
          </p>
          <p>
            Fast-forward to today, I'm a <strong>results-driven software developer</strong> and proficient 
            frontend expert with 2+ years of experience in the IT field. My daily work revolves around a 
            robust technology stack, including core frontend tools like JavaScript, TypeScript, React, 
            and Angular.
          </p>
          <p>
            I am also highly experienced in developing comprehensive backend applications using Java, Spring Boot, 
            C#, and the .NET Core ecosystem. Furthermore, my background includes implementing cloud 
            solutions with Docker and Azure, and managing databases such as MySQL and PostgreSQL.
          </p>
          <p>
            I ensure code quality and collaborative efficiency through development practices like Git, Scrum, 
            and unit testing, and I am always exploring automation processes using AI agents to streamline workflows.
          </p>
        </div>
        
        <div class="about-visual">
          <div #terminal class="terminal-window">
            <div class="terminal-header">
              <div class="terminal-buttons">
                <span class="close"></span>
                <span class="minimize"></span>
                <span class="maximize"></span>
              </div>
              <div class="terminal-title">gerardo-mundo.zsh</div>
            </div>
            <div class="terminal-body">
              <pre class="typing-container"><code #displayedText></code><span class="cursor" #cursor>|</span></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-section {
      padding: 100px 2rem;
      min-height: 80vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .about-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }
    .about-text {
      p {
        font-size: 1.1rem;
        line-height: 1.7;
        color: var(--text-secondary);
        margin-bottom: 1.5rem;
        
        strong {
          color: var(--accent-color);
        }
      }
    }
    .about-visual {
      position: relative;
      width: 100%;
    }
    
    /* Terminal Styles */
    .terminal-window {
      background: #1e1e1e;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      border: 1px solid var(--border-color);
      transform: translateY(0);
      transition: transform 0.3s ease;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(17, 195, 89, 0.2);
      }
    }
    .terminal-header {
      background: #2d2d2d;
      padding: 10px 15px;
      display: flex;
      align-items: center;
      position: relative;
    }
    .terminal-buttons {
      display: flex;
      gap: 8px;
      
      span {
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }
      .close { background: #ff5f56; }
      .minimize { background: #ffbd2e; }
      .maximize { background: #27c93f; }
    }
    .terminal-title {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      color: #999;
      font-size: 0.85rem;
      font-family: monospace;
    }
    .terminal-body {
      padding: 20px;
      min-height: 300px;
      max-height: 400px;
      overflow-y: auto;
      
      pre {
        margin: 0;
        white-space: pre-wrap;
        word-break: break-word;
      }
      
      .typing-container {
        font-family: 'Fira Code', 'Consolas', monospace;
        font-size: 0.80rem;
        line-height: 1.5;
        color: #d4d4d4;
      }
    }
    
    /* Syntax Highlighting Colors (Hardcoded in the typed string) */
    ::ng-deep .string { color: #ce9178; }
    ::ng-deep .key { color: #9cdcfe; }
    ::ng-deep .number { color: #b5cea8; }
    ::ng-deep .boolean { color: #569cd6; }
    ::ng-deep .array-bracket { color: #ffd700; }
    
    .cursor {
      color: var(--accent-color);
      font-weight: bold;
    }
    
    @media (max-width: 900px) {
      .about-content {
        grid-template-columns: 1fr;
      }
      .terminal-window {
        max-width: 500px;
        margin: 0 auto;
      }
    }
  `]
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('aboutContent') contentRef!: ElementRef;
  @ViewChild('displayedText') displayedTextRef!: ElementRef;
  @ViewChild('cursor') cursorRef!: ElementRef;
  @ViewChild('terminal') terminalRef!: ElementRef;
  private isBrowser: boolean = false;
  
  displayedText = '';
  isFinished = false;
  private typeInterval: any;
  private resetTimeout: any;
  private hasTriggered = false;

  terminalData = `{
  <span class="key">"name"</span>: <span class="string">"Gerardo Mundo"</span>,
  <span class="key">"role"</span>: <span class="string">"Full-Stack Software Developer"</span>,
  <span class="key">"experience_years"</span>: <span class="number">2</span>,
  <span class="key">"passionate_about"</span>: [
    <span class="string">"Clean Code"</span>,
    <span class="string">"Clean Architecture"</span>,
    <span class="string">"Performance & Optimization"</span>,
    <span class="string">"AI Agents & Automations"</span>
  ],
  <span class="key">"location"</span>: <span class="string">"Mexico"</span>,
  <span class="key">"available_for_relocation"</span>: <span class="boolean">true</span>
}`;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private animationService: AnimationService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.startTyping();
    }
  }

  private startTyping() {
    const gsap = this.animationService.getGsap();
    const ScrollTrigger = this.animationService.getScrollTrigger();
    
    gsap.to(this.cursorRef.nativeElement, {
      opacity: 0,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      duration: 0.5
    });

    ScrollTrigger.create({
      trigger: this.terminalRef.nativeElement,
      start: "top 60%",
      onEnter: () => {
        if (!this.hasTriggered) {
          this.hasTriggered = true;
          this.typeHTMLSequence();
        }
      }
    });
  }

  private typeHTMLSequence() {
    this.displayedTextRef.nativeElement.innerHTML = '';
    
    let i = 0;
    let isTag = false;
    let text = '';

    const typeChar = () => {
      if (i < this.terminalData.length) {
        let char = this.terminalData.charAt(i);
        if (char === '<') {
          isTag = true;
        }
        text += char;
        if (char === '>') {
          isTag = false;
        }
        i++;
        
        if (isTag) {
          typeChar(); // Process tags instantly without delay
        } else {
          this.displayedTextRef.nativeElement.innerHTML = text;
          
          this.typeInterval = setTimeout(typeChar, 80);
        }
      } else {
        this.resetTimeout = setTimeout(() => {
          this.typeHTMLSequence();
        }, 3000);
      }
    };
    
    typeChar();
  }

  ngOnDestroy() {
    if (this.typeInterval) {
      clearInterval(this.typeInterval);
    }
    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
    }
  }
}
