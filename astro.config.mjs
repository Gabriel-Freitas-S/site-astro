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

  integrations: [robotsTxt({
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
  }), compressor({
    gzip: true,
    brotli: true,
    fileExtensions: ['.css', '.js', '.html', '.xml', '.svg', '.json']
  }), minify(), sitemap({
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date(),
  }), partytown({
    config: {
      forward: ['dataLayer.push'],
    }
  }), icon({ include: { mdi: ['open-in-new'] } })],

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
  
  vite: {
    build: {
      cssCodeSplit: true,
      modulePreload: {
        polyfill: true,
        resolveDependencies: (url, deps, { hostId, hostType }) => {
          return deps.filter(dep => !dep.includes('node_modules'))
        }
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Cria chunks para componentes reutilizados
            if (id.includes('/components/')) {
              return 'components';
            }
            // Separa as dependências de terceiros
            if (id.includes('node_modules')) {
              if (id.includes('astro-icon')) {
                return 'icons';
              }
              if (id.includes('astro:transitions')) {
                return 'transitions';
              }
              return 'vendor';
            }
            // Agrupa arquivos de utilidades
            if (id.includes('/utils/')) {
              return 'utils';
            }
          },
          chunkFileNames: 'assets/js/[name].[hash].js',
          assetFileNames: ({name}) => {
            if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
              return 'assets/images/[name].[hash][extname]';
            }
            if (/\.css$/.test(name ?? '')) {
              return 'assets/css/[name].[hash][extname]';
            }
            return 'assets/[ext]/[name].[hash][extname]';
          },
          entryFileNames: 'assets/[name].[hash].js'
        }
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.debug', 'console.info'],
          passes: 2,
          ecma: 2020
        },
        mangle: {
          safari10: true
        },
        format: {
          comments: false,
          ecma: 2020
        }
      },
      sourcemap: false
    },
    ssr: {
      noExternal: ['@fontsource/*']
    },
    optimizeDeps: {
      exclude: ['@astrojs/image', 'sharp']
    }
  },
});