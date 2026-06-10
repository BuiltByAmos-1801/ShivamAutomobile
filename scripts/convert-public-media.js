const fs = require("fs");
const path = require("path");
const convert = require("heic-convert");
const sharp = require("sharp");

const publicDir = path.join(process.cwd(), "public");
const outDir = path.join(publicDir, "workshop");

fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const files = fs
    .readdirSync(publicDir)
    .filter((file) => /\.heic$/i.test(file))
    .sort();

  for (const [index, file] of files.entries()) {
    const outputName = `workshop-${String(index + 1).padStart(2, "0")}.jpg`;
    const outputPath = path.join(outDir, outputName);
    const input = await fs.promises.readFile(path.join(publicDir, file));
    const jpegBuffer = await convert({
      buffer: input,
      format: "JPEG",
      quality: 0.9
    });

    await sharp(Buffer.from(jpegBuffer), { limitInputPixels: false })
      .rotate()
      .resize({ width: 1600, height: 1100, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(outputPath);

    console.log(`${file} -> ${path.relative(publicDir, outputPath)}`);
  }

  const outputFiles = fs
    .readdirSync(outDir)
    .filter((file) => /^workshop-\d+\.jpg$/i.test(file))
    .sort();
  const thumbs = [];

  for (const file of outputFiles) {
    const svg = `
      <svg width="240" height="165" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="135" width="240" height="30" fill="black" opacity="0.7"/>
        <text x="10" y="156" font-size="18" fill="white" font-family="Arial">${file}</text>
      </svg>
    `;
    const input = await sharp(path.join(outDir, file))
      .resize(240, 165, { fit: "cover" })
      .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
      .png()
      .toBuffer();
    thumbs.push({
      input,
      top: Math.floor(thumbs.length / 3) * 165,
      left: (thumbs.length % 3) * 240
    });
  }

  await sharp({
    create: {
      width: 720,
      height: Math.ceil(outputFiles.length / 3) * 165,
      channels: 4,
      background: "#111111"
    }
  })
    .composite(thumbs)
    .png()
    .toFile(path.join(outDir, "contact-sheet.png"));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
