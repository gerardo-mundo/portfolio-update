import { Component, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { AnimationService } from '../../core/services/animation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="hero-section" id="hero">
      <canvas #heroCanvas class="hero-canvas"></canvas>
      <div class="hero-content container">
        <h2 class="greeting">Hi, I'm</h2>
        <h1 class="name">Gerardo Mundo</h1>
        <h3 class="role">Full-Stack Software Developer</h3>
        <p class="description">
          Results-driven developer with 2+ years of experience in building 
          robust web applications with modern technologies such as, Angular, Java, Spring Boot, and .Net Core.
        </p>
        <div class="actions">
          <a href="#projects" class="btn-primary">View My Work</a>
          <a href="#about" class="btn-secondary">About Me</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      position: relative;
      height: 100vh;
      min-height: 600px;
      display: flex;
      align-items: center;
      overflow: hidden;
      padding-top: 80px; /* navbar height */
    }
    .hero-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
    }
    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 800px;
    }
    .greeting {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--accent-color);
      margin-bottom: 0.5rem;
      opacity: 0;
    }
    .name {
      font-size: 5rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1rem;
      letter-spacing: -2px;
      opacity: 0;
    }
    .role {
      font-size: 2.5rem;
      font-weight: 600;
      color: var(--text-secondary);
      margin-bottom: 2rem;
      opacity: 0;
    }
    .description {
      font-size: 1.25rem;
      line-height: 1.6;
      max-width: 600px;
      margin-bottom: 3rem;
      color: var(--text-secondary);
      opacity: 0;
    }
    .actions {
      display: flex;
      gap: 1rem;
      opacity: 0;
    }
    .btn-secondary {
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      border: 1px solid var(--border-color);
      transition: all 0.2s ease;
      
      &:hover {
        background: var(--card-hover);
        border-color: var(--text-secondary);
      }
    }
    
    @media (max-width: 768px) {
      .name { font-size: 3.5rem; }
      .role { font-size: 1.8rem; }
      .actions { flex-direction: column; }
    }
  `]
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private particles!: THREE.Points;
  private lines!: THREE.LineSegments;
  private animationId!: number;
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private animationService: AnimationService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.initThreeJs();
      this.initAnimations();
    }
  }

  private initAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    
    tl.fromTo('.greeting', { y: 20, opacity: 0 }, { y: 0, opacity: 1, delay: 0.2 })
      .fromTo('.name', { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.6')
      .fromTo('.role', { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.6')
      .fromTo('.description', { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.6')
      .fromTo('.actions', { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.6');
  }

  private initThreeJs() {
    const canvas = this.canvasRef.nativeElement;
    
    this.scene = new THREE.Scene();
    
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 100;
    
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle nodes setup
    const particleCount = 150;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: {x: number, y: number, z: number}[] = [];

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 300;
      positions[i + 1] = (Math.random() - 0.5) * 300;
      positions[i + 2] = (Math.random() - 0.5) * 300;
      
      velocities.push({
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5,
        z: (Math.random() - 0.5) * 0.5
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const accentColor = new THREE.Color('#11c359');
    
    const material = new THREE.PointsMaterial({
      color: accentColor,
      size: 3,
      transparent: true,
      opacity: 0.8
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    // Lines geometry setup
    const linesGeometry = new THREE.BufferGeometry();
    const linesMaterial = new THREE.LineBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.15
    });
    this.lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    this.scene.add(this.lines);

    const animate = () => {
      this.animationId = requestAnimationFrame(animate);

      const positions = this.particles.geometry.attributes['position'].array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i].x;
        positions[i * 3 + 1] += velocities[i].y;
        positions[i * 3 + 2] += velocities[i].z;

        // Boundary check
        if (Math.abs(positions[i * 3]) > 150) velocities[i].x *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 150) velocities[i].y *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 150) velocities[i].z *= -1;
      }
      this.particles.geometry.attributes['position'].needsUpdate = true;

      // Update lines
      const linePositions = [];
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
          
          if (dist < 35) {
            linePositions.push(
              positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
              positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
            );
          }
        }
      }
      this.lines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

      this.renderer.render(this.scene, this.camera);
    };

    animate();

    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private onWindowResize() {
    if (this.camera && this.renderer) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      cancelAnimationFrame(this.animationId);
      window.removeEventListener('resize', this.onWindowResize.bind(this));
      if (this.renderer) {
        this.renderer.dispose();
      }
    }
  }
}
