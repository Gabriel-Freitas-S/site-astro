import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputPath = path.join(__dirname, '../src/assets/images/profile.webp');
const outputPath = path.join(__dirname, '../src/assets/images/profile-280.webp');

// Redimensiona para 280x280 (2x o tamanho máximo usado para retina)
sharp(inputPath)
    .resize(280, 280, {
        fit: 'cover',
        position: 'center'
    })
    .webp({ 
        quality: 85,
        effort: 6
    })
    .toFile(outputPath)
    .then(info => {
        console.log('Imagem otimizada:', info);
    })
    .catch(err => {
        console.error('Erro ao otimizar imagem:', err);
    });