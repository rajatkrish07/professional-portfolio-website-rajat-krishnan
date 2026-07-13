import { Jimp } from 'jimp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_IMAGE = path.resolve(__dirname, '../src/assets/images/profile.jpg');
const PUBLIC_DIR = path.resolve(__dirname, '../public');

async function generateFavicons() {
  console.log('Starting favicon generation from canonical source:', SOURCE_IMAGE);

  if (!fs.existsSync(SOURCE_IMAGE)) {
    console.error('Error: Source image does not exist at:', SOURCE_IMAGE);
    process.exit(1);
  }

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  try {
    // Generate raster icons using Jimp
    const image = await Jimp.read(SOURCE_IMAGE);

    const sizes = {
      'favicon-16x16.png': 16,
      'favicon-32x32.png': 32,
      'favicon.ico': 32, // PNG works perfectly as .ico in modern browsers
      'apple-touch-icon.png': 180,
      'android-chrome-192x192.png': 192,
      'android-chrome-512x512.png': 512,
    };

    for (const [filename, size] of Object.entries(sizes)) {
      const resized = image.clone();
      resized.resize({ w: size, h: size });
      const outputPath = path.join(PUBLIC_DIR, filename);
      if (filename.endsWith('.ico')) {
        const tempPath = path.join(PUBLIC_DIR, 'favicon-ico-temp.png');
        await resized.write(tempPath);
        if (fs.existsSync(outputPath)) {
          fs.unlinkSync(outputPath);
        }
        fs.renameSync(tempPath, outputPath);
      } else {
        await resized.write(outputPath);
      }
      console.log(`Generated: ${filename} (${size}x${size})`);
    }

    // Generate SVG icon with embedded base64 string of the JPEG
    const base64Data = fs.readFileSync(SOURCE_IMAGE).toString('base64');
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <!-- Rounded clipping path for the avatar image -->
    <clipPath id="avatarClip">
      <circle cx="256" cy="256" r="256" />
    </clipPath>
  </defs>

  <!-- The beautiful circular cropped Profile Photo of the user -->
  <g clip-path="url(#avatarClip)">
    <image href="data:image/jpeg;base64,${base64Data}" width="512" height="512" />
  </g>
</svg>`;

    fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.svg'), svgContent);
    console.log('Generated: favicon.svg (embedded base64)');
    console.log('Favicon generation completed successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
