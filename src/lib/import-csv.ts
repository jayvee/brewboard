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

export function importCSV(csvString: string): BeerEntry[] {
  const lines = csvString.split(/\r?\n/).filter((l) => l.trim() !== "");
  if (lines.length === 0) return [];

  // Detect and skip header row
  const firstFields = parseCSVLine(lines[0]);
  const hasHeader =
    firstFields[0].toLowerCase() === "name" ||
    firstFields[1]?.toLowerCase() === "brewery";
  const dataLines = hasHeader ? lines.slice(1) : lines;

  const seen = new Set<string>();
  const results: BeerEntry[] = [];

  for (const line of dataLines) {
    const fields = parseCSVLine(line);
    const name = fields[0] ?? "";
    const brewery = fields[1] ?? "";
    if (!name && !brewery) continue;

    const key = `${name.toLowerCase()}|${brewery.toLowerCase()}`;
    if (!seen.has(key)) {
      seen.add(key);
      results.push({ name, brewery });
    }
  }

  return results;
}
