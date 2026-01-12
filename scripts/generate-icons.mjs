import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// SVG with solid color (indigo/primary) instead of currentColor
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <!-- Background for better visibility -->
  <rect width="32" height="32" rx="6" fill="#6366f1"/>
  <!-- Connection lines -->
  <path d="M6 8 L16 6 L26 10 M16 6 L14 16 L20 24 L10 26 M14 16 L6 8 M14 16 L26 10" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
  <!-- Stars -->
  <circle cx="6" cy="8" r="2.5" fill="#ffffff"/>
  <circle cx="16" cy="6" r="3" fill="#ffffff"/>
  <circle cx="26" cy="10" r="2" fill="#ffffff"/>
  <circle cx="14" cy="16" r="2.5" fill="#ffffff"/>
  <circle cx="20" cy="24" r="2" fill="#ffffff"/>
  <circle cx="10" cy="26" r="2.5" fill="#ffffff"/>
  <!-- Small accent stars -->
  <circle cx="24" cy="20" r="1" fill="#ffffff" opacity="0.6"/>
  <circle cx="4" cy="18" r="1" fill="#ffffff" opacity="0.6"/>
</svg>`;

async function generateIcons() {
  const publicDir = join(rootDir, 'public');
  
  // Ensure public directory exists
  mkdirSync(publicDir, { recursive: true });

  const svgBuffer = Buffer.from(svgIcon);

  // Generate apple-touch-icon (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Generated apple-touch-icon.png (180x180)');

  // Generate icon-192.png for PWA
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(join(publicDir, 'icon-192.png'));
  console.log('✓ Generated icon-192.png (192x192)');

  // Generate icon-512.png for PWA
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(join(publicDir, 'icon-512.png'));
  console.log('✓ Generated icon-512.png (512x512)');

  // Generate favicon.ico (multiple sizes in ICO format)
  // Sharp doesn't support ICO directly, so we'll create a 32x32 PNG
  // Next.js can use favicon.ico from public/ or app/icon.svg automatically
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(join(publicDir, 'favicon-32.png'));
  console.log('✓ Generated favicon-32.png (32x32)');

  // Generate 16x16 favicon variant
  await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toFile(join(publicDir, 'favicon-16.png'));
  console.log('✓ Generated favicon-16.png (16x16)');

  console.log('\nAll icons generated successfully in public/');
}

generateIcons().catch(console.error);
