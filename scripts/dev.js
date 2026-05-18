const { spawn } = require('child_process');

const isWindows = process.platform === 'win32';

const services = [
  { name: 'backend', command: 'npm --prefix backend run dev' },
  { name: 'frontend', command: 'npm --prefix frontend run dev' }
];

const children = services.map((service) => {
  const child = spawn(service.command, {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit',
    shell: isWindows ? 'cmd.exe' : true
  });

  child.on('error', (error) => {
    console.error(`${service.name} failed to start: ${error.message}`);
  });

  child.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`${service.name} stopped with exit code ${code}`);
    }
  });

  return child;
});

const stopChildren = () => {
  children.forEach((child) => {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  });
};

process.on('SIGINT', () => {
  stopChildren();
  process.exit(0);
});

process.on('SIGTERM', () => {
  stopChildren();
  process.exit(0);
});
