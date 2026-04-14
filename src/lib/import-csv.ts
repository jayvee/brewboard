export interface BeerEntry {
  name: string;
  brewery: string;
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      fields.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  fields.push(current.trim());
  return fields;
}

export function parseCSV(csv: string): BeerEntry[] {
  const lines = csv.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return [];

  // Skip header row if present (first line contains "name" and "brewery")
  const firstFields = parseCSVLine(lines[0]).map((f) => f.toLowerCase());
  const startIndex =
    firstFields.includes("name") && firstFields.includes("brewery") ? 1 : 0;

  const seen = new Set<string>();
  const results: BeerEntry[] = [];

  for (let i = startIndex; i < lines.length; i++) {
    const fields = parseCSVLine(lines[i]);
    if (fields.length < 2) continue;
    const name = fields[0];
    const brewery = fields[1];
    const key = `${name.toLowerCase()}|${brewery.toLowerCase()}`;
    if (!seen.has(key)) {
      seen.add(key);
      results.push({ name, brewery });
    }
  }

  return results;
}
