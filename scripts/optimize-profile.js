import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, '..', 'public', 'profile.webp');
const outputPath = path.join(__dirname, '..', 'public', 'profile.webp');

async function optimizeImage() {
    try {
        await sharp(inputPath)
            .resize(140, 140, {
                fit: 'cover',
                position: 'center'
            })
            .webp({ quality: 80 })
            .toFile(outputPath + '.temp');

        // Renomear o arquivo temporário para o arquivo final
        await import('fs/promises').then(fs => 
            fs.rename(outputPath + '.temp', outputPath)
        );

        console.log('Imagem otimizada com sucesso!');
    } catch (error) {
        console.error('Erro ao otimizar a imagem:', error);
    }
}

optimizeImage();