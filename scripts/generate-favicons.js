import { Jimp } from 'jimp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PROFILE_BASE64 } from './profile-base64.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_IMAGE = path.resolve(__dirname, '../src/assets/images/profile.jpg');
const PUBLIC_DIR = path.resolve(__dirname, '../public');

// MIME type detection function based on magic bytes (file signature)
function getMimeType(buffer) {
  if (!buffer || buffer.length < 4) return null;
  
  // PNG: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
    return 'image/png';
  }
  
  // JPEG: FF D8 FF
  if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
    return 'image/jpeg';
  }
  
  // GIF: 47 49 46 38 ('GIF8')
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38) {
    return 'image/gif';
  }
  
  // WEBP: RIFF .... WEBP
  if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46) {
    if (buffer.length >= 12 && buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50) {
      return 'image/webp';
    }
  }
  
  return null;
}

async function generateFavicons() {
  console.log('Starting favicon generation from canonical source:', SOURCE_IMAGE);

  // 1. Ensure the output directory exists
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  try {
    let buffer = null;
    let isFileValid = false;

    // Check if SOURCE_IMAGE exists and is a file
    if (fs.existsSync(SOURCE_IMAGE)) {
      try {
        const stats = fs.statSync(SOURCE_IMAGE);
        if (stats.isFile() && stats.size > 0) {
          buffer = fs.readFileSync(SOURCE_IMAGE);
          
          // Detect the actual MIME type of the file
          const detectedMime = getMimeType(buffer);
          if (detectedMime) {
            console.log(`[generate-favicons] Verified file at ${SOURCE_IMAGE}. Detected format: ${detectedMime}`);
            isFileValid = true;

            // 2. If the extension is .jpg but format is actually something else (e.g., PNG), convert to genuine JPEG
            if (detectedMime !== 'image/jpeg') {
              console.log(`[generate-favicons] Warning: Extension is .jpg but actual file signature is ${detectedMime}. Converting to a genuine JPEG...`);
              try {
                const tempImage = await Jimp.read(buffer);
                // Convert buffer to JPEG format
                const jpegBuffer = await tempImage.getBuffer('image/jpeg');
                fs.writeFileSync(SOURCE_IMAGE, jpegBuffer);
                buffer = jpegBuffer;
                console.log(`[generate-favicons] Successfully converted source image to genuine JPEG and updated ${SOURCE_IMAGE}`);
              } catch (conversionError) {
                console.error('[generate-favicons] Image conversion failed, using fallback Base64 source:', conversionError);
                isFileValid = false; // Trigger fallback restoration
              }
            }
          } else {
            // Check if it's a Git LFS pointer or other non-image text file
            const sampleText = buffer.slice(0, 200).toString('utf8');
            if (sampleText.includes('version https://git-lfs') || sampleText.includes('oid sha256')) {
              console.warn('[generate-favicons] Detected Git LFS pointer instead of actual image binary.');
            } else {
              console.warn('[generate-favicons] Source file does not have a supported image signature.');
            }
          }
        }
      } catch (err) {
        console.error(`[generate-favicons] Failed to read source file stats:`, err);
      }
    } else {
      console.warn('[generate-favicons] Source image file does not exist.');
    }

    // 3. Fallback: Restore canonical JPEG from embedded Base64 if file is missing, corrupt, or an LFS pointer
    if (!isFileValid) {
      console.log('[generate-favicons] File validation failed. Restoring canonical image from secure embedded Base64 fallback...');
      buffer = Buffer.from(PROFILE_BASE64, 'base64');
      fs.writeFileSync(SOURCE_IMAGE, buffer);
      console.log(`[generate-favicons] Restored genuine profile.jpg to ${SOURCE_IMAGE}`);
    }

    // 4. Generate raster icons using Jimp
    console.log('[generate-favicons] Loading image into Jimp for resize...');
    const image = await Jimp.read(buffer);

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
        // Safe write: Jimp doesn't encode ICO directly, so write as PNG and rename to .ico
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

    // 5. Generate SVG icon with embedded base64 string of the JPEG
    const base64Data = buffer.toString('base64');
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
    console.error('[generate-favicons] Error generating favicons gracefully caught:', error);
    // Exit with 0 as required so we show a descriptive error but DO NOT crash the build on Render
    process.exit(0);
  }
}

generateFavicons();
