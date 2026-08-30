import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const app = await readFile(new URL('../app.js', import.meta.url), 'utf8');

test('lokale Chrome-versie gebruikt geen JavaScript-modules', () => {
  assert.match(html, /<script defer src="app\.js"><\/script>/);
  assert.doesNotMatch(html, /type="module"/);
  assert.doesNotMatch(app, /^import\s/m);
});

test('taal, geschiedenis en beide resultaatexports zijn aanwezig', () => {
  for (const id of ['language-button', 'history-list', 'distribution-name', 'pdf-export', 'csv-export', 'data-export', 'data-import', 'hussel-tab', 'flits-tab', 'wheel', 'quick-pick', 'spin-button']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(app, /nl:\{/);
  assert.match(app, /fr:\{/);
  assert.match(app, /application\/pdf/);
  assert.match(app, /text\/csv/);
  assert.match(app, /data-history=\"rename\"/);
  assert.match(app, /data-history=\"delete\"/);
  assert.match(app, /Helvetica-Bold/);
  assert.match(app, /MediaBox \[0 0 842 595\]/);
  assert.match(app, /window\.open\(url,'_blank'/);
  assert.match(app, /addEventListener\('dragstart'/);
  assert.match(app, /addEventListener\('drop'/);
  assert.match(app, /data-remove-person/);
  assert.match(app, /function removePerson\(/);
  assert.match(app, /function spinWheel\(/);
  assert.match(app, /function spinSound\(/);
  assert.match(app, /function wheelClick\(/);
  assert.match(app, /__flashWoodImpulse/);
  assert.match(app, /filter\.type='bandpass'/);
  assert.doesNotMatch(app, /osc\.type='square'/);
  assert.match(app, /function quickPick\(/);
  assert.match(app, /function nextWheelIndex\(/);
  assert.doesNotMatch(app, /ctx\.rotate\(-\(angle\+rotation\)\)/);
  assert.match(app, /crypto\?\.getRandomValues/);
  assert.match(app, /AudioContext/);
  assert.match(app, /remove-winner'\)\.hidden=w\.autoRemove\.checked/);
  assert.doesNotMatch(app, /text\('Hussel'/);
  assert.doesNotMatch(app, /Eerlijk verdeeld met Hussel/);
});

test('verborgen beginscherm kan niet door componentopmaak zichtbaar blijven', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  assert.match(css, /\[hidden\]\s*\{\s*display:none!important;/);
});
