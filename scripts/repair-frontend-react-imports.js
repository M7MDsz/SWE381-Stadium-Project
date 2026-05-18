const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const srcRoot = path.join(root, 'frontend', 'src');

const walk = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walk(fullPath));
    } else if (entry.isFile() && fullPath.endsWith('.jsx')) {
      files.push(fullPath);
    }
  });
  return files;
};

const jsxFiles = walk(srcRoot);
let changed = 0;

jsxFiles.forEach((filePath) => {
  const text = fs.readFileSync(filePath, 'utf8');
  if (!text.includes('<')) {
    return;
  }

  if (!text.includes("from 'react'")) {
    fs.writeFileSync(filePath, `import React from 'react';\n${text}`);
    changed += 1;
    return;
  }

  const lines = text.split('\n');
  const idx = lines.findIndex((line) => line.includes("from 'react'"));
  if (idx >= 0 && !lines[idx].startsWith('import React')) {
    lines[idx] = lines[idx].replace('import {', 'import React, {');
    fs.writeFileSync(filePath, lines.join('\n'));
    changed += 1;
  }
});

console.log(`Checked ${jsxFiles.length} JSX files.`);
console.log(`Updated ${changed} file(s).`);
