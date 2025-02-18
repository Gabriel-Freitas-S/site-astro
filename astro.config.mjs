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
      fileExtensions: ['.css', '.js', '.html', '.xml', '.svg', '.json']
    }),
    minify(),
    sitemap(),
    partytown(),
    icon({ include: { mdi: ['open-in-new'] } })
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
    }
  },
  build: {
    inlineStylesheets: 'auto',
    assets: 'assets',
    redirects: true
  },
  output: 'static',
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' https://www.googletagmanager.com",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:;",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' https://www.google-analytics.com",
        "frame-src 'none'",
        "form-action 'none'",
        "base-uri 'self'",
        "object-src 'none'"
      ].join('; ')
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
            'icons': ['simple-icons/*', 'mdi/*', 'logos/*', 'vscode-icons/*'],
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
