// @ts-check
import { defineConfig } from 'astro/config';
import compressor from 'astro-compressor';
import minify from 'astro-minify-html-swc';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [compressor({
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
  }), minify(), sitemap()]
});