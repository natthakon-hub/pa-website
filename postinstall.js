const fs = require('fs');
const path = require('path');

const wranglerBinPaths = [
  path.resolve(__dirname, 'node_modules/.bin/wrangler'),
  path.resolve(__dirname, 'node_modules/wrangler/bin/wrangler.js')
];

const injection = `
// --- INJECTED FIX ---
if (process.argv.includes('pages') && process.argv.includes('deploy') && !process.argv.includes('--project-name')) {
  process.argv.push('--project-name', 'pa-website');
}
// --------------------
`;

for (const binPath of wranglerBinPaths) {
  if (fs.existsSync(binPath)) {
    let content = fs.readFileSync(binPath, 'utf8');
    if (!content.includes('INJECTED FIX')) {
      content = content.replace(/^(#!\/usr\/bin\/env node\r?\n)/, '$1' + injection);
      fs.writeFileSync(binPath, content);
      console.log('Successfully patched wrangler at', binPath);
    }
  }
}
