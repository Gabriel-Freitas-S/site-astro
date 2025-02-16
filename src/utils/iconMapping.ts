// Mapeamento centralizado de ícones para toda a aplicação
export const iconMap: Record<string, string> = {
    // Linguagens
    'TypeScript': 'simple-icons:typescript',
    'TypeScript/JavaScript': 'simple-icons:typescript',
    'JavaScript': 'simple-icons:javascript',
    'HTML': 'simple-icons:html5',
    'CSS': 'simple-icons:css3',
    'HTML/CSS': 'simple-icons:html5',
    'Python': 'simple-icons:python',
    'Dart': 'simple-icons:dart',
    'Rust': 'simple-icons:rust',
    
    // Frameworks
    'React': 'simple-icons:react',
    'Flutter': 'simple-icons:flutter',
    'Astro': 'simple-icons:astro',
    
    // Ferramentas e Tecnologias
    'Git': 'simple-icons:git',
    'Docker': 'simple-icons:docker',
    'VSCode': 'simple-icons:visualstudiocode',
    'Node.js': 'simple-icons:nodedotjs',
    'PostgreSQL': 'simple-icons:postgresql',
    'MongoDB': 'simple-icons:mongodb',
    'Jenkins': 'simple-icons:jenkins',
    'Jest': 'simple-icons:jest',
    'Figma': 'simple-icons:figma',
    'Android': 'simple-icons:android',
    'Expo': 'simple-icons:expo',
    'CI/CD': 'simple-icons:jenkins'
};

// Função genérica para obter ícone
export const getIcon = (key: string): string => {
    return iconMap[key] || 'mdi:code-braces';
};

// Função específica para habilidades
export const getSkillIcon = (skill: string): string => {
    return getIcon(skill);
};

// Função específica para tecnologias
export const getTechIcon = (tech: string): string => {
    return getIcon(tech);
};