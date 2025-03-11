import { promises as fs, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs_extra from 'fs-extra';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directories to copy from public to dist
const directories = [
  'audio',
  'videos',
  'images',
  'stickers'
];

console.log('Starting to copy media files...');

// Make sure the dist directory exists
if (!existsSync('dist')) {
  console.log('Creating dist directory...');
  mkdirSync('dist');
}

// Copy each directory
for (const dir of directories) {
  const sourcePath = join('public', dir);
  const destPath = join('dist', dir);
  
  // Check if the source directory exists
  if (existsSync(sourcePath)) {
    console.log(`Copying ${sourcePath} to ${destPath}...`);
    
    try {
      // Ensure target directory exists
      await fs_extra.ensureDir(destPath);
      
      // Get list of files to check
      const files = await fs.readdir(sourcePath);
      console.log(`Found ${files.length} files in ${sourcePath}`);
      
      // Show some of the files
      if (files.length > 0) {
        console.log('Sample files:');
        files.slice(0, Math.min(5, files.length)).forEach(file => {
          console.log(` - ${file}`);
        });
      }
      
      // Copy the directory
      await fs_extra.copy(sourcePath, destPath, {
        overwrite: true,
        errorOnExist: false
      });
      
      // Verify the copy worked
      if (existsSync(destPath)) {
        const copiedFiles = await fs.readdir(destPath);
        console.log(`✓ Successfully copied ${copiedFiles.length} files to ${destPath}`);
      } else {
        console.error(`✗ Failed to create directory ${destPath}`);
      }
    } catch (err) {
      console.error(`Error copying ${dir} directory:`, err);
    }
  } else {
    console.warn(`Warning: Source directory ${sourcePath} does not exist.`);
  }
}

// Special attention to stickers directory which is critical for mobile
const stickersSourcePath = join('public', 'stickers');
const stickersDestPath = join('dist', 'stickers');

if (existsSync(stickersSourcePath)) {
  console.log('\nEnsuring stickers are properly copied (critical for mobile)...');
  
  try {
    // Make sure the stickers directory exists in dist
    await fs_extra.ensureDir(stickersDestPath);
    
    // Get list of sticker files
    const stickerFiles = await fs.readdir(stickersSourcePath);
    console.log(`Found ${stickerFiles.length} sticker files to copy`);
    
    // Copy each sticker file individually to ensure they all get copied
    for (const file of stickerFiles) {
      const sourcePath = join(stickersSourcePath, file);
      const destPath = join(stickersDestPath, file);
      
      await fs.copyFile(sourcePath, destPath);
      console.log(`Copied ${file} to stickers directory`);
    }
    
    console.log(`✓ Successfully copied ${stickerFiles.length} sticker files`);
  } catch (err) {
    console.error(`Error copying stickers directory:`, err);
  }
} else {
  console.warn(`Warning: Stickers directory ${stickersSourcePath} does not exist!`);
}

// Adding favicon file
try {
  console.log('\nSetting up favicon from stickers/jijah-16.png...');
  
  // Copy from stickers to root of dist folder
  const faviconSource = join('public', 'stickers', 'jijah-16.png');
  const faviconDest = join('dist', 'favicon.ico');
  const faviconPngDest = join('dist', 'favicon.png');
  
  if (existsSync(faviconSource)) {
    await fs.copyFile(faviconSource, faviconDest);
    await fs.copyFile(faviconSource, faviconPngDest);
    console.log('✓ Successfully copied favicon from sticker');
    
    // Also copy original sticker to maintain reference
    const originalDest = join('dist', 'jijah-16.png');
    await fs.copyFile(faviconSource, originalDest);
  } else {
    console.warn(`Warning: Favicon source ${faviconSource} does not exist`);
  }
} catch (err) {
  console.error('Error setting up favicon:', err);
}

console.log('\nMedia copy process completed.');