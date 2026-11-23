/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public', 'images');

async function convertAll() {
  const files = fs.readdirSync(publicDir);
  console.log(`Found ${files.length} items in public/images`);

  let totalOriginal = 0;
  let totalOptimized = 0;
  let convertedCount = 0;

  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      continue;
    }

    const inputPath = path.join(publicDir, f);
    const baseName = path.basename(f, ext);
    const outputPath = path.join(publicDir, `${baseName}.webp`);

    const stat = fs.statSync(inputPath);
    const originalSize = stat.size;
    totalOriginal += originalSize;

    let pipeline = sharp(inputPath);

    if (f === 'bg-mitra.jpg' || f === 'latarbelakang.png') {
      pipeline = pipeline
        .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80, effort: 6, smartSubsample: true });
    } else if (f.startsWith('logo')) {
      pipeline = pipeline
        .resize({ width: 800, height: 800, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 90, alphaQuality: 100, effort: 6 });
    } else if (f.startsWith('obj-') || f.startsWith('sejarah-')) {
      pipeline = pipeline
        .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82, effort: 6, smartSubsample: true });
    } else {
      pipeline = pipeline
        .resize({ width: 768, height: 768, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82, effort: 6, alphaQuality: 95 });
    }

    await pipeline.toFile(outputPath);

    const outStat = fs.statSync(outputPath);
    totalOptimized += outStat.size;
    convertedCount++;

    const inKb = (originalSize / 1024).toFixed(1);
    const outKb = (outStat.size / 1024).toFixed(1);
    const pct = (((originalSize - outStat.size) / originalSize) * 100).toFixed(1);

    console.log(`✓ ${f} (${inKb} KB) -> ${baseName}.webp (${outKb} KB) [Savings: ${pct}%]`);
  }

  const origMb = (totalOriginal / (1024 * 1024)).toFixed(2);
  const optMb = (totalOptimized / (1024 * 1024)).toFixed(2);
  const totalPct = (((totalOriginal - totalOptimized) / totalOriginal) * 100).toFixed(1);

  console.log(`\n========================================`);
  console.log(`Converted ${convertedCount} images to WebP.`);
  console.log(`Original total:  ${origMb} MB`);
  console.log(`Optimized total: ${optMb} MB`);
  console.log(`Total savings:   ${totalPct}% (${(origMb - optMb).toFixed(2)} MB saved!)`);
  console.log(`========================================\n`);
}

convertAll().catch(err => {
  console.error(err);
  process.exit(1);
});
