import fs from 'fs';

const manifestPath = 'public/build/manifest.json';
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  const cssFile = manifest['resources/css/style.css']?.file;
  const jsFile = manifest['resources/js/app.js']?.file;

  fs.rmSync('dist/assets', { recursive: true, force: true });
  fs.mkdirSync('dist/assets', { recursive: true });
  fs.cpSync('public/build/assets', 'dist/assets', { recursive: true });

  ['dist/index.php', 'dist/.htaccess', 'dist/build', 'dist/storage'].forEach(p => {
    if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
  });

  if (fs.existsSync('public/_redirects')) {
    fs.copyFileSync('public/_redirects', 'dist/_redirects');
  }

  if (fs.existsSync('public/favicon.ico')) {
    fs.copyFileSync('public/favicon.ico', 'dist/favicon.ico');
  }

  if (fs.existsSync('public/img')) {
    fs.cpSync('public/img', 'dist/img', { recursive: true });
  }

  if (fs.existsSync('public/images')) {
    fs.cpSync('public/images', 'dist/images', { recursive: true });
  }

  if (fs.existsSync('public/fonts')) {
    fs.cpSync('public/fonts', 'dist/fonts', { recursive: true });
  }

  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bubble — прачечная рядом</title>
    ${cssFile ? `<link rel="stylesheet" href="/${cssFile}">` : ''}
    ${jsFile ? `<script type="module" src="/${jsFile}"></script>` : ''}
</head>
<body class="bg-bubble-cream text-bubble-dark font-sans m-0 antialiased">
    <div id="app"></div>
</body>
</html>
`;

  fs.writeFileSync('dist/index.html', html.trim());
  console.log('dist built successfully');
}
