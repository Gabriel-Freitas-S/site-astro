import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, '../src/assets/images/profile.webp');
const outputDir = path.join(__dirname, '../src/assets/images');

// Configurações de tamanhos para diferentes breakpoints
const sizes = [
    { width: 100, suffix: '-100' },  // Mobile
    { width: 140, suffix: '-140' },  // Desktop
    { width: 280, suffix: '-280' }   // 2x para Retina
];

// Configurações de qualidade para cada formato
const formats = {
    webp: {
        quality: 85,
        effort: 6,
        progressive: true
    },
    avif: {
        quality: 80,
        effort: 9,
        chromaSubsampling: '4:4:4'
    }
};

// Metadados para SEO
const metadata = {
    exif: {
        IFD0: {
            ImageDescription: 'Foto de perfil de Gabriel Freitas Souza - Desenvolvedor de Software',
            Copyright: 'Gabriel Freitas Souza',
            Artist: 'Gabriel Freitas Souza'
        }
    }
};

async function optimizeImage() {
    try {
        const image = sharp(inputPath).withMetadata(metadata);
        
        // Processa cada tamanho
        for (const size of sizes) {
            const resized = image.clone().resize(size.width, size.width, {
                fit: 'cover',
                position: 'center',
                withoutEnlargement: true
            });

            // Gera cada formato
            for (const [format, options] of Object.entries(formats)) {
                const outputPath = path.join(
                    outputDir, 
                    `profile${size.suffix}.${format}`
                );

                await resized.clone()[format](options).toFile(outputPath);
                
                console.log(`✓ Gerado: profile${size.suffix}.${format}`);
            }
        }

        console.log('\n✨ Otimização de imagens concluída com sucesso!');
    } catch (err) {
        console.error('❌ Erro ao otimizar imagens:', err);
        process.exit(1);
    }
}

optimizeImage();