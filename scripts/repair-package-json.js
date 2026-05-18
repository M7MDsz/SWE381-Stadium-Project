const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const files = {
  'package.json': {
    name: 'swe381-stadium-project',
    version: '1.0.0',
    private: true,
    description: 'Full-stack SWE381 stadium reservation application',
    scripts: {
      postinstall: 'npm --prefix backend install && npm --prefix frontend install',
      dev: 'node scripts/dev.js',
      start: 'node scripts/dev.js',
      verify: 'node scripts/verify-project.js',
      'check:backend': 'node --check backend/server.js && node --check backend/app.js && for f in backend/controllers/*.js backend/routes/*.js backend/models/*.js backend/middleware/*.js backend/config/*.js; do node --check "$f" || exit 1; done',
      'dev:backend': 'npm --prefix backend run dev',
      'dev:frontend': 'npm --prefix frontend run dev'
    }
  },
  'backend/package.json': {
    name: 'swe381-stadium-backend',
    version: '1.0.0',
    description: 'SWE381 stadium reservation backend',
    main: 'server.js',
    scripts: {
      start: 'node server.js',
      dev: 'nodemon server.js'
    },
    dependencies: {
      bcrypt: '^5.1.1',
      cors: '^2.8.5',
      dotenv: '^16.4.5',
      express: '^4.18.3',
      jsonwebtoken: '^9.0.2',
      mongoose: '^8.2.1'
    },
    devDependencies: {
      nodemon: '^3.1.0'
    }
  },
  'frontend/package.json': {
    name: 'swe381-stadium-frontend',
    version: '1.0.0',
    description: 'SWE381 stadium reservation frontend',
    private: true,
    scripts: {
      dev: 'vite --host 0.0.0.0',
      build: 'vite build',
      start: 'vite --host 0.0.0.0'
    },
    dependencies: {
      vite: '^5.1.6',
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      'react-router-dom': '^6.22.3',
      bootstrap: '^5.3.3'
    },
    devDependencies: {}
  }
};

Object.entries(files).forEach(([file, content]) => {
  const filePath = path.join(root, file);
  fs.writeFileSync(filePath, `${JSON.stringify(content, null, 2)}\n`);
  JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(`Repaired ${file}`);
});

console.log('All package.json files are valid JSON now.');
