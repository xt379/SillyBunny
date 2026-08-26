import { Jimp } from 'jimp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const imgDir = path.join(projectRoot, 'public', 'img');
const sourcePath = path.join(imgDir, 'fairy-source.png');

const sizes = [
  { size: 192, file: 'apple-icon-192x192.png' },
  { size: 256, file: 'icon-256x256.png' },
  { size: 512, file: 'apple-icon-512x512.png' },
  { size: 512, file: 'icon-512x512.png' },
  { size: 16, file: 'icon-16x16.png' },
  { size: 24, file: 'icon-24x24.png' },
  { size: 32, file: 'icon-32x32.png' },
  { size: 48, file: 'icon-48x48.png' },
  { size: 64, file: 'icon-64x64.png' },
  { size: 96, file: 'icon-96x96.png' },
  { size: 128, file: 'icon-128x128.png' },
  { size: 57, file: 'apple-icon-57x57.png' },
  { size: 72, file: 'apple-icon-72x72.png' },
  { size: 114, file: 'apple-icon-114x114.png' },
  { size: 144, file: 'apple-icon-144x144.png' },
  { size: 180, file: 'apple-icon-180x180.png' },
  { size: 512, file: 'logo.png' },
  { size: 512, file: 'sillybunny-badge.png' },
  { size: 512, file: 'sillybunny-pixel-logo.png' },
  { size: 512, file: 'sillybunny-pixel-logo-og.png' },
];

async function main() {
  const sourceBuffer = fs.readFileSync(sourcePath);
  console.log('Source loaded:', sourceBuffer.length, 'bytes');

  for (const { size, file } of sizes) {
    try {
      const image = await Jimp.read(sourceBuffer);
      await image.resize({ w: size, h: size });
      const outPath = path.join(imgDir, file);
      await image.write(outPath);
      console.log('OK:', file, '(' + size + 'x' + size + ')');
    } catch (err) {
      console.error('FAIL:', file, err.message);
    }
  }

  console.log('Done!');
}

main().catch(err => { console.error(err); process.exit(1); });
