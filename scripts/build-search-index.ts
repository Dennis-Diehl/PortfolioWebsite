import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { buildSearchDocs } from "../src/content/searchDocs";

/**
 * Generates public/search-index.json at build time (via the `prebuild` script).
 * The client fetches this JSON lazily the first time search is opened.
 */
function main() {
  const docs = buildSearchDocs();
  const outDir = join(process.cwd(), "public");
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, "search-index.json");
  writeFileSync(outFile, JSON.stringify(docs), "utf8");
  console.log(`✓ search index written: ${docs.length} documents → public/search-index.json`);
}

main();
