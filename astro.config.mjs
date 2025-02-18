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
      },
      svgoOptions: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
                removeUselessStrokeAndFill: false,
              },
            },
          },
          'removeDimensions',
        ],
      },
    })
  ],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        jpeg: { quality: 80, progressive: true },
        png: { quality: 80, progressive: true },
        webp: { quality: 80, effort: 4 },
        avif: { quality: 80, effort: 4 }
      }
    },
    domains: [],
    remotePatterns: [],
    format: 'avif',
    fallbackFormat: 'webp'
  },
  build: {
    inlineStylesheets: 'auto',
    assets: 'assets',
    redirects: true
  },
  output: 'static',
  server: {
    headers: {
      'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.google-analytics.com;
        style-src 'self' 'unsafe-inline' https://fonts.gstatic.com;
        connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net;
        img-src 'self' data: https: https://*.google-analytics.com;
        font-src 'self' https://fonts.gstatic.com;
        worker-src 'self' blob:;
        frame-src 'self';
        frame-ancestors 'none';
        base-uri 'self';
        form-action 'self';
        object-src 'none';
        upgrade-insecure-requests;
      `.replace(/\s+/g, ' ').trim(),
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
    }
  },
  vite: {
    build: {
      cssCodeSplit: true,
      modulePreload: {
        polyfill: true
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['astro-icon'],
            'icons': ['simple-icons/*', 'mdi/*'],
            'transitions': ['astro:transitions']
          },
          chunkFileNames: 'assets/js/[hash].js',
          assetFileNames: 'assets/[ext]/[hash][extname]'
        }
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.debug', 'console.info']
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
