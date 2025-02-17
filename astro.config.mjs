// @ts-check
import { defineConfig } from 'astro/config';
import compressor from 'astro-compressor';
import minify from 'astro-minify-html-swc';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://gabrielfs.dev',
  compressHTML: true,
  integrations: [
    compressor({
      gzip: true,
      brotli: true,
      fileExtensions: [
        '.css',
        '.js',
        '.html',
        '.xml',
        '.cjs',
        '.mjs',
        '.svg',
        '.txt',
        '.json',
        '.ts'
      ]
    }),
    minify(),
    sitemap(),
    icon({
      include: {
        'simple-icons': [
          'typescript',
          'javascript',
          'react',
          'nodedotjs',
          'android',
          'jenkins',
          'git',
          'jest',
          'figma',
          'html5',
          'css3',
          'python',
          'docker',
          'postgresql',
          'mongodb',
          'flutter',
          'dart',
          'rust',
          'astro',
          'visualstudiocode',
          'expo'
        ],
        mdi: [
          'code-tags',
          'code-braces'
        ]
      }
    })
  ],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        jpeg: { quality: 80, progressive: true },
        png: { quality: 80, progressive: true },
        webp: { quality: 80, effort: 6 },
        avif: { quality: 80, effort: 6 }
      }
    },
    domains: [],
    remotePatterns: [],
    format: 'webp'
  },
  build: {
    inlineStylesheets: 'auto',
    assets: 'assets',
    redirects: true
  },
  vite: {
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          manualChunks: undefined,
          chunkFileNames: 'assets/js/[hash].js',
          assetFileNames: 'assets/[ext]/[hash][extname]'
        }
      }
    },
    ssr: {
      noExternal: ['@fontsource/*']
    },
    optimizeDeps: {
      exclude: ['@astrojs/image', 'sharp']
    }
  }
});
