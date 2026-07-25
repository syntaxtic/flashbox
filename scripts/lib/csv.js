/** Minimal RFC4180-ish CSV parser/writer (quoted fields, newlines in cells). */

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"' && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (c === '"') {
        inQ = false;
      } else {
        cur += c;
      }
    } else if (c === '"') {
      inQ = true;
    } else if (c === ",") {
      row.push(cur);
      cur = "";
    } else if (c === "\n") {
      row.push(cur);
      rows.push(row);
      row = [];
      cur = "";
    } else if (c !== "\r") {
      cur += c;
    }
  }
  if (cur.length || row.length) {
    row.push(cur);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => String(c).trim() !== ""));
}

function rowsToObjects(rows) {
  if (!rows.length) return [];
  const header = rows[0].map((h) => h.trim());
  return rows.slice(1).map((cols) => {
    const obj = {};
    for (let i = 0; i < header.length; i++) {
      obj[header[i]] = cols[i] != null ? cols[i] : "";
    }
    return obj;
  });
}

function escCsv(v) {
  if (v == null) return "";
  const s = String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function objectsToCsv(objects, columns) {
  const lines = [columns.join(",")];
  for (const obj of objects) {
    lines.push(columns.map((c) => escCsv(obj[c] ?? "")).join(","));
  }
  return lines.join("\n") + "\n";
}

module.exports = { parseCsv, rowsToObjects, objectsToCsv, escCsv };
