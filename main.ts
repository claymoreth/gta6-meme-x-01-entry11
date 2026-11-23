// OVERDUE PARKING TICKET: 13 YEARS IN VICE CITY
// Entry for make.fun gta6-meme-x-01. Copies the meme image to /output.
// The grader runs this from a non-repo cwd with MAKEFUN_BOT_DIR=/bot,
// so every input path is resolved from MAKEFUN_BOT_DIR, never process.cwd().
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? process.cwd();
const outDir = "/output";

mkdirSync(outDir, { recursive: true });

for (const file of ["meme.png", "POST.json"]) {
  const src = join(botDir, file);
  if (!existsSync(src)) {
    throw new Error(`missing ${file} in ${botDir}`);
  }
  const dest = join(outDir, file === "meme.png" ? "entry.png" : file);
  copyFileSync(src, dest);
  const bytes = statSync(dest).size;
  if (bytes === 0) {
    throw new Error(`copied ${file} is empty: ${dest}`);
  }
  console.log(`copied ${file} -> ${dest} (${bytes} bytes)`);
}
