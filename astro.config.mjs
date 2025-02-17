// @ts-check
import { defineConfig } from 'astro/config';
import compressor from 'astro-compressor';
import minify from 'astro-minify-html-swc';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import partytown from '@astrojs/partytown';
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: 'https://gabrielfs.dev',
  compressHTML: true,
  integrations: [
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          allow: '/',
          crawlDelay: 10
        },
        {
          userAgent: 'Googlebot',
          allow: '/',
          crawlDelay: 2
        }
      ],
      sitemap: true,
      host: true
    }),
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
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
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
    prefetchAll: false,
    defaultStrategy: 'viewport'
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        jpeg: { quality: 75, progressive: true },
        png: { quality: 75, progressive: true },
        webp: { quality: 75, effort: 6 },
        avif: { quality: 75, effort: 6 }
      }
    },
    domains: [],
    remotePatterns: [],
    format: 'avif',
    fallbackFormat: 'webp'
  },
  build: {
    inlineStylesheets: 'always',
    assets: 'assets',
    redirects: true
  },
  output: 'static',
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['astro-icon'],
            'icons': ['simple-icons/*', 'mdi/*']
          },
          chunkFileNames: 'assets/js/[hash].js',
          assetFileNames: 'assets/[ext]/[hash][extname]'
        }
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
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
