const { spawn } = require('child_process');

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const services = [
  { name: 'backend', args: ['--prefix', 'backend', 'run', 'dev'] },
  { name: 'frontend', args: ['--prefix', 'frontend', 'run', 'dev'] }
];

const children = services.map((service) => {
  const child = spawn(npmCommand, service.args, {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit'
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
