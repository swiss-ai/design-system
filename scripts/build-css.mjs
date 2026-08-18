// Assemble the distributable CSS release: the reusable stylesheets plus the
// design/ assets that apertus.css references relatively.
import { cpSync, mkdirSync, rmSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist/css', { recursive: true });
cpSync('css/apertus.css', 'dist/css/apertus.css');
cpSync('css/apertus-bootstrap.css', 'dist/css/apertus-bootstrap.css');
cpSync('design', 'dist/design', { recursive: true });
console.log('Wrote dist/css/apertus.css, dist/css/apertus-bootstrap.css and dist/design/');
