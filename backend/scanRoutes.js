const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname);
const regex = /(router|app)\.(get|post|put|delete|use)\(['"`]\s*\/:\s*['"`]/i;

function scanDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (regex.test(line)) {
          console.log(`⚠️  Suspicious route in ${fullPath} (line ${idx + 1}):`);
          console.log(`   ${line.trim()}`);
        }
      });
    }
  });
}

console.log('🔎 Scanning for malformed route definitions...\n');
scanDir(ROOT_DIR);
console.log('\n✅ Scan complete.');
