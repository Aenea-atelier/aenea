import sharp from 'sharp';
import { readdir, rename } from 'fs/promises';
import path from 'path';

const dir = './public';
const files = (await readdir(dir)).filter(f => /\.(jpg|jpeg|png)$/i.test(f) && f !== 'logo-aenea.png');

console.log(`Optimizing ${files.length} images...\n`);

for (const file of files) {
  const input = path.join(dir, file);
  const tmp = path.join(dir, `__tmp_${file}`);
  try {
    await sharp(input)
      .resize({ width: 1800, withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(tmp);
    await rename(tmp, input);
    console.log(`✓ ${file}`);
  } catch (e) {
    console.log(`✗ ${file} — ${e.message}`);
  }
}
console.log('\nDone!');
