import { Injectable, signal } from '@angular/core';

export interface Experience {
  title: string;
  company: string;
  date: string;
  description: string;
}

export interface Project {
  title: string;
  technologies: string[];
  description: string;
  link?: string;
}

export interface Technology {
  name: string;
  iconClass: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  experiences = signal<Experience[]>([
    {
      title: 'Full-Stack Software Developer',
      company: 'Quo Technology / Quo Logistics',
      date: '2024 - Present',
      description: 'Developing comprehensive applications using Angular and Java. Implementation of third-party APIs integrations, enhancing efficiency and data management capabilities'
    },
    {
      title: 'Backend Developer',
      company: 'Capit Broke',
      date: 'Feb, 2023 - Oct,2023',
      description: 'Built high-performance Backend services with C# and .NET Core. Implemented comprehensive business logic and CRUD operations.'
    }
  ]);

  projects = signal<Project[]>([
    {
      title: 'Library Management System',
      technologies: ['Angular 16', '.NET Core', 'SQL Server'],
      description: 'A comprehensive management system for library operations, featuring book tracking, user management, and automated fine calculations.'
    },
    {
      title: 'Dog Park System Management',
      technologies: ['React 18', 'TypeScript', 'Express.js', 'PostgreSQL'],
      description: 'A SaaS platform to manage dog park memberships, access control, and community events.'
    },
    {
      title: 'Legacy System Migration',
      technologies: ['Java', 'Spring Boot', 'MySQL'],
      description: 'Architected and executed the migration of a monolithic application to a microservices architecture.'
    }
  ]);

  technologies = signal<Technology[]>([
    { name: 'Angular', iconClass: 'devicon-angularjs-plain' },
    { name: 'React', iconClass: 'devicon-react-original' },
    { name: 'TypeScript', iconClass: 'devicon-typescript-plain' },
    { name: '.NET Core', iconClass: 'devicon-dotnetcore-plain' },
    { name: 'Spring Boot', iconClass: 'devicon-spring-original' },
    { name: 'Docker', iconClass: 'devicon-docker-plain' },
    { name: 'Azure', iconClass: 'devicon-azure-plain' },
    { name: 'PostgreSQL', iconClass: 'devicon-postgresql-plain' },
    { name: 'Java', iconClass: 'devicon-java-plain' },
    { name: 'Python', iconClass: 'devicon-python-plain' },
    { name: 'Git', iconClass: 'devicon-git-plain' },
    { name: 'Postman', iconClass: 'devicon-postman-plain' }
  ]);
}
