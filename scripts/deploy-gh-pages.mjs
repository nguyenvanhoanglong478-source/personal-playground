import { execFileSync, execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

/**
 * Build the Vite production bundle and force-push it to the `gh-pages` branch
 * via a temporary orphan worktree so `main` stays untouched.
 */
function deployGitHubPages() {
  const repoRoot = process.cwd();
  const distDir = path.join(repoRoot, 'dist');
  const shortSha = execFileSync('git', ['rev-parse', '--short', 'HEAD'], {
    cwd: repoRoot,
    encoding: 'utf8',
  }).trim();

  execSync('npm run build', {
    cwd: repoRoot,
    stdio: 'inherit',
  });

  if (!fs.existsSync(distDir)) {
    throw new Error('Build output directory `dist` was not generated.');
  }

  const branchName = `gh-pages-deploy-${Date.now()}`;
  const tempWorktree = fs.mkdtempSync(path.join(os.tmpdir(), 'gh-pages-'));

  try {
    execFileSync('git', ['worktree', 'add', '--orphan', '-b', branchName, tempWorktree], {
      cwd: repoRoot,
      stdio: 'inherit',
    });

    fs.cpSync(distDir, tempWorktree, { recursive: true });
    fs.writeFileSync(path.join(tempWorktree, '.nojekyll'), '');

    execFileSync('git', ['add', '-A'], { cwd: tempWorktree, stdio: 'inherit' });
    execFileSync('git', ['commit', '-m', `deploy: sync GitHub Pages from ${shortSha}`], {
      cwd: tempWorktree,
      stdio: 'inherit',
    });
    execFileSync('git', ['push', 'origin', `${branchName}:gh-pages`, '--force'], {
      cwd: tempWorktree,
      stdio: 'inherit',
    });
  } finally {
    try {
      execFileSync('git', ['worktree', 'remove', '--force', tempWorktree], {
        cwd: repoRoot,
        stdio: 'ignore',
      });
    } catch {
      fs.rmSync(tempWorktree, { recursive: true, force: true });
    }
    try {
      execFileSync('git', ['branch', '-D', branchName], {
        cwd: repoRoot,
        stdio: 'ignore',
      });
    } catch {
      // Temp branch may not exist if worktree creation failed.
    }
  }
}

deployGitHubPages();
