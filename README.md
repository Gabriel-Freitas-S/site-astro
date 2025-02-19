# Portfolio Pessoal

Site pessoal desenvolvido com Astro, focado em performance, SEO e boas práticas de desenvolvimento.

## 🚀 Estrutura do Projeto

```
├── src/
│   ├── assets/          # Recursos estáticos (imagens, SVGs)
│   ├── components/      # Componentes Astro reutilizáveis
│   ├── content/         # Dados estruturados em JSON
│   ├── layouts/         # Layouts base
│   └── pages/          # Páginas da aplicação
```

### 📄 Páginas

- `index.astro` - Página inicial
- `certificacoes.astro` - Lista de certificações
- `experiencia.astro` - Experiência profissional

### 🧱 Componentes

- `BaseCard.astro` - Card base reutilizável
- `CertificationCard.astro` - Card para exibição de certificações
- `ExperienceCard.astro` - Card para exibição de experiência profissional
- `Header.astro` - Cabeçalho do site
- `Navigation.astro` - Navegação principal
- `SearchBar.astro` - Barra de pesquisa
- `SkillCard.astro` - Card para exibição de habilidades

## 🛠️ Tecnologias Utilizadas

- **[Astro](https://astro.build/)** v5.3.0
- **[@astrojs/sitemap](https://www.npmjs.com/package/@astrojs/sitemap)** - Geração automática de sitemap
- **[astro-robots-txt](https://www.npmjs.com/package/astro-robots-txt)** - Geração de robots.txt
- **[astro-icon](https://www.npmjs.com/package/astro-icon)** - Integração com ícones
- **[astro-compressor](https://www.npmjs.com/package/astro-compressor)** - Compressão de assets
- **[astro-minify-html-swc](https://www.npmjs.com/package/astro-minify-html-swc)** - Minificação de HTML

## ⚡ Otimizações

### Performance
- Compressão de assets (Gzip e Brotli)
- Minificação de HTML, CSS e JavaScript
- Prefetch automático de recursos
- Code splitting e lazy loading
- Otimização de imagens com Sharp

### SEO
- Sitemap automático
- Robots.txt configurável
- Meta tags otimizadas

### Segurança
- Content Security Policy (CSP) configurado
- Headers de segurança:
  - X-Content-Type-Options
  - X-Frame-Options
  - Referrer-Policy
  - Permissions-Policy
  - Strict-Transport-Security

## 🚦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview da build
npm run preview

# Build e preview local
npm run local
```

## 📝 Content Collections

O conteúdo dinâmico é gerenciado através de collections em JSON:

- `certifications/` - Certificações e formações
- `experience/` - Experiência profissional

## 🏗️ Build e Deploy

O site é construído como uma aplicação estática (`output: 'static'`) com as seguintes otimizações:

- Inline de stylesheets quando apropriado
- Otimização de assets
- Suporte a redirecionamentos
- Chunk splitting otimizado para vendor, icons e transitions