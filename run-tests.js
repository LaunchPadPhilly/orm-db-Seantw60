#!/usr/bin/env node

const { spawn } = require('child_process');

// Start the dev server
const devServer = spawn('npm', ['run', 'dev'], {
  stdio: 'pipe'
});

let serverReady = false;

// Wait for server to be ready
devServer.stdout.on('data', (data) => {
  const output = data.toString();
  console.log('[Dev Server]', output);
  
  // Check if server is ready
  if (output.includes('ready - started server') || output.includes('Local:')) {
    serverReady = true;
    if (!testsStarted) {
      startTests();
    }
  }
});

devServer.stderr.on('data', (data) => {
  const output = data.toString();
  if (!output.includes('Note:')) {
    console.error('[Dev Server Error]', output);
  }
});

let testsStarted = false;

function startTests() {
  testsStarted = true;
  console.log('\n[Test Runner] Dev server is ready, starting tests...\n');
  
  const vitest = spawn('npx', ['vitest', 'run'], {
    stdio: 'inherit'
  });

  vitest.on('close', (code) => {
    console.log('\n[Test Runner] Tests finished with code', code);
    devServer.kill();
    process.exit(code);
  });
}

// Timeout if server doesn't start after 15 seconds
setTimeout(() => {
  if (!serverReady) {
    console.log('[Test Runner] Dev server timeout, starting tests anyway...');
    if (!testsStarted) {
      startTests();
    }
  }
}, 15000);
