/// <reference types="astro/client" />

declare module 'astro:content' {
  interface Schemas {
    certifications: {
      type: 'data';
      data: {
        title: string;
        duration: string;
        courses: {
          name: string;
          period?: string;
          duration: string;
        }[];
        complementaryContent?: {
          name: string;
          duration: string;
        }[];
      };
    };
    experience: {
      type: 'data';
      data: {
        company: string;
        position: string;
        period: string;
        description: string;
        technologies?: string[];
        achievements?: string[];
      };
    };
  }
}