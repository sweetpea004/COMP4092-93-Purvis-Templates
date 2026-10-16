import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { styleText } from 'node:util';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const npmCli = join(dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js');
const eslintCli = join(root, 'node_modules', 'eslint', 'bin', 'eslint.js');
const pa11yCli = join(root, 'node_modules', 'pa11y-ci', 'bin', 'pa11y-ci.js');
const targets = new Set(['Accessible', 'Naive']);
const args = process.argv.slice(2);
const flags = new Set(args.filter((arg) => arg.startsWith('--')));
const [command, target] = args.filter((arg) => !arg.startsWith('--'));

if (!['pa11y', 'axe', 'lint'].includes(command) || !targets.has(target)) {
  console.error(
    'Usage: node testing/run.mjs <pa11y|axe|lint> <Accessible|Naive> [--serve] [--json]',
  );
  process.exit(1);
}

function start(commandArgs, cwd) {
  const child = spawn(process.execPath, commandArgs, {
    cwd,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  const forward = (chunk) => process.stderr.write(chunk);
  child.stdout.on('data', forward);
  child.stderr.on('data', forward);
  child.on('error', (error) => {
    console.error(error.message);
  });

  return child;
}

function stop(child) {
  if (!child?.pid || child.exitCode !== null) {
    return;
  }

  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', String(child.pid), '/t', '/f'], { stdio: 'ignore' });
    return;
  }

  try {
    process.kill(child.pid, 'SIGTERM');
  } catch {
    // The process has already exited.
  }
}

function cleanLintSummary() {
  const summary = '\u2714 0 problems (0 errors, 0 warnings)';
  return styleText('green', styleText('bold', summary), { validateStream: true });
}

function run(commandArgs) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, commandArgs, {
      cwd: root,
      stdio: 'inherit',
    });

    child.on('error', reject);
    child.on('close', (code) => resolve(code ?? 1));
  });
}

async function waitFor(url) {
  const deadline = Date.now() + 60_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // The server is still starting.
    }

    await delay(300);
  }

  throw new Error(`Timed out waiting for ${url}`);
}

async function withServers(scan) {
  const site = join(root, target);
  const viteCli = join(site, 'node_modules', 'vite', 'bin', 'vite.js');
  const backend = start([npmCli, 'run', 'backend'], site);
  const frontend = start([viteCli, '--port', '5173', '--strictPort'], site);

  try {
    await Promise.all([
      waitFor('http://localhost:3000/meals'),
      waitFor('http://localhost:5173/'),
    ]);
    return await scan();
  } finally {
    stop(backend);
    stop(frontend);
  }
}

async function scan() {
  if (command === 'lint') {
    const code = await run([
      eslintCli,
      '-c',
      'testing/eslint.config.js',
      '--report-unused-disable-directives-severity',
      'error',
      '--max-warnings',
      '0',
      target,
    ]);

    if (code === 0) {
      console.log(`\n${cleanLintSummary()}`);
    }

    return code;
  }

  if (command === 'pa11y') {
    const pa11yArgs = [pa11yCli, '--config', 'testing/pa11yci.json'];
    if (flags.has('--json')) {
      pa11yArgs.push('--json');
    }
    return run(pa11yArgs);
  }

  const axeArgs = [join(root, 'testing', 'axe.mjs')];
  if (flags.has('--json')) {
    axeArgs.push('--json');
  }
  return run(axeArgs);
}

const scanWithServers = flags.has('--serve') ? withServers(scan) : scan();

scanWithServers
  .then((code) => {
    process.exitCode = code;
  })
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
