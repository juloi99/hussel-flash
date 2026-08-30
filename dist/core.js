export function parseNames(value) {
  const seen = new Set();
  return value.split(/\r?\n|,/).map((name) => name.trim()).filter((name) => {
    const key = name.toLocaleLowerCase('nl');
    if (!name || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function secureShuffle(items, randomValues) {
  const result = [...items];
  let pool = randomValues ? [...randomValues] : null;
  for (let i = result.length - 1; i > 0; i--) {
    const value = pool ? pool.shift() ?? Math.random() : Math.random();
    const j = Math.floor(value * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function makeGroups(names, mode, amount, shuffled = secureShuffle(names)) {
  if (!Number.isInteger(amount) || amount < 1) throw new Error('Ongeldig aantal');
  if (names.length < 2) throw new Error('Minimaal twee namen nodig');
  const groupCount = mode === 'size' ? Math.ceil(names.length / amount) : Math.min(amount, names.length);
  return Array.from({ length: groupCount }, (_, index) => {
    const base = Math.floor(names.length / groupCount);
    const remainder = names.length % groupCount;
    const start = index * base + Math.min(index, remainder);
    const length = base + (index < remainder ? 1 : 0);
    return shuffled.slice(start, start + length);
  });
}

export function distributionText(count, mode, amount) {
  if (!count) return 'Voeg namen toe voor een verdeling';
  const groups = mode === 'size' ? Math.ceil(count / amount) : Math.min(count, amount);
  const small = Math.floor(count / groups);
  const large = Math.ceil(count / groups);
  const sizes = small === large ? `${small} per groep` : `${small}–${large} per groep`;
  return `${groups} ${groups === 1 ? 'groep' : 'groepen'} · ${sizes}`;
}
