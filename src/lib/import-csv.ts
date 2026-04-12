export function parseCSV(csv: string): Array<{ name: string; brewery: string }> {
  const lines = csv.split('\n').filter(line => line.trim() !== '');
  const results: Array<{ name: string; brewery: string }> = [];
  const seen = new Set<string>();

  for (const line of lines) {
    const [rawName, rawBrewery] = splitCSVLine(line);
    if (!rawName || !rawBrewery) continue;

    const name = rawName.trim();
    const brewery = rawBrewery.trim();
    const key = `${name.toLowerCase()}|${brewery.toLowerCase()}`;

    if (!seen.has(key)) {
      seen.add(key);
      results.push({ name, brewery });
    }
  }

  return results;
}

function splitCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      fields.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current);

  return fields;
}
