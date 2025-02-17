type IconName = 'typescript' | 'javascript' | 'react' | 'astro';

// Pré-carrega ícones críticos para melhor performance
const criticalIcons: IconName[] = [
  'typescript',
  'javascript',
  'react',
  'astro'
];

if (typeof window !== 'undefined') {
  requestIdleCallback(() => {
    criticalIcons.forEach((icon: IconName) => {
      const link: HTMLLinkElement = document.createElement('link');
      link.rel = 'preload';
      link.href = `/sprite/simple-icons/${icon}.svg`;
      link.as = 'image';
      link.type = 'image/svg+xml';
      document.head.appendChild(link);
    });
  });
}

export type { IconName };