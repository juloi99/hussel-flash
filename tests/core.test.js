import test from 'node:test';
import assert from 'node:assert/strict';
import { parseNames, makeGroups, distributionText } from '../core.js';

test('namen worden opgeschoond en hoofdletterongevoelig ontdubbeld', () => {
  assert.deepEqual(parseNames(' Noor\nsem\nNOOR\n\n Yara, Milan '), ['Noor','sem','Yara','Milan']);
});
test('restpersonen worden eerlijk verdeeld bij aantal groepen', () => {
  const names = ['A','B','C','D','E','F','G','H'];
  const groups = makeGroups(names, 'groups', 3, names);
  assert.deepEqual(groups.map((group) => group.length), [3,3,2]);
  assert.equal(new Set(groups.flat()).size, 8);
});
test('personen per groep maakt voldoende groepen en balanceert', () => {
  const names = ['A','B','C','D','E','F','G','H','I','J'];
  assert.deepEqual(makeGroups(names, 'size', 4, names).map((group) => group.length), [4,3,3]);
});
test('meer groepen dan namen wordt defensief begrensd', () => {
  assert.deepEqual(makeGroups(['A','B'], 'groups', 5, ['A','B']), [['A'],['B']]);
});
test('verdelingsuitleg noemt variërende groepsgrootte', () => {
  assert.equal(distributionText(8, 'groups', 3), '3 groepen · 2–3 per groep');
});
test('ongeldige invoer geeft een fout', () => {
  assert.throws(() => makeGroups(['A'], 'groups', 1), /Minimaal/);
});
