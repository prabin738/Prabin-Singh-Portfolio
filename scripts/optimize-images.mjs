// Build-time image pipeline for the static export.
//
// Reads every original image from `assets-src/`, and for each one writes
// several WebP files (one per usable width) into `public/img/`, mirroring
// the folder structure. It also writes `src/generated/image-manifest.json`,
// which records the intrinsic size and the widths that were actually
// generated for each image, so `src/lib/images.ts` and the custom
// `next/image` loader can look them up without touching the filesystem.
//
// Usage: `node scripts/optimize-images.mjs [--force]`
// `--force` regenerates every output even if it already looks up to date.

import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "assets-src");
const OUT_DIR = path.join(ROOT, "public", "img");
const MANIFEST_PATH = path.join(ROOT, "src", "generated", "image-manifest.json");

// Keep in sync with `deviceSizes` in next.config.ts.
const WIDTHS = [480, 768, 1080, 1440];
const WEBP_QUALITY = 80;
const WARN_BYTES = 200 * 1024;

const IMAGE_EXTENSION_RE = /\.(png|jpe?g|webp)$/i;
const VALID_FILE_NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*\.(png|jpg|jpeg|webp)$/;

const force = process.argv.includes("--force");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (entry.isFile()) {
      files.push(full);
    }
  }
  return files;
}

function describeNameProblem(name) {
  if (/\s/.test(name)) return "contains a space";
  if (/[A-Z]/.test(name)) return "contains an uppercase letter";
  return "must use only lowercase letters, digits and hyphens";
}

async function fileExists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  let allFiles = [];
  try {
    allFiles = await walk(SRC_DIR);
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }

  const imageFiles = allFiles.filter((file) => IMAGE_EXTENSION_RE.test(file));

  // Validate every name up front so a typo never produces a half-finished build.
  const violations = imageFiles
    .map((file) => ({ file, base: path.basename(file) }))
    .filter(({ base }) => !VALID_FILE_NAME_RE.test(base))
    .map(({ file, base }) => `  - ${path.relative(ROOT, file)}: ${describeNameProblem(base)}`);

  if (violations.length > 0) {
    console.error("Image file names must be lowercase, with hyphens instead of spaces:\n");
    console.error(violations.join("\n"));
    console.error("\nRename the file(s) above and run `yarn images` again.");
    process.exitCode = 1;
    return;
  }

  if (imageFiles.length === 0) {
    console.log("No images found in assets-src/. Add originals there and run `yarn images` again.");
    await mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
    await writeFile(MANIFEST_PATH, "{}\n");
    console.log(`Wrote empty manifest to ${path.relative(ROOT, MANIFEST_PATH)}`);
    return;
  }

  const manifest = {};
  const rows = [];

  for (const file of imageFiles.sort()) {
    const relFromSrc = path.relative(SRC_DIR, file);
    const withoutExt = relFromSrc.slice(0, -path.extname(relFromSrc).length);
    const manifestKey = `/img/${withoutExt.split(path.sep).join("/")}`;
    const outDir = path.join(OUT_DIR, path.dirname(withoutExt));
    const outName = path.basename(withoutExt);

    // metadata() reads the file header only; it reports raw pixel dimensions
    // and leaves EXIF orientation to us, so a portrait photo shot sideways
    // still needs its width/height swapped for the manifest.
    const meta = await sharp(file).metadata();
    const orientation = meta.orientation ?? 1;
    const isSideways = orientation >= 5 && orientation <= 8;
    const width = isSideways ? meta.height : meta.width;
    const height = isSideways ? meta.width : meta.height;
    if (!width || !height) {
      throw new Error(`Could not read dimensions for ${path.relative(ROOT, file)}`);
    }

    const targetWidths = WIDTHS.filter((w) => w <= width);
    if (targetWidths.length === 0) targetWidths.push(width);

    const outputs = targetWidths.map((w) => ({
      width: w,
      path: path.join(outDir, `${outName}-${w}.webp`),
    }));

    const sourceStat = await stat(file);
    let upToDate = !force;
    for (const output of upToDate ? outputs : []) {
      if (!(await fileExists(output.path))) {
        upToDate = false;
        break;
      }
      const outStat = await stat(output.path);
      if (outStat.mtimeMs < sourceStat.mtimeMs) {
        upToDate = false;
        break;
      }
    }

    if (!upToDate) {
      await mkdir(outDir, { recursive: true });
      for (const output of outputs) {
        await sharp(file)
          .rotate()
          .resize({ width: output.width, withoutEnlargement: true })
          .webp({ quality: WEBP_QUALITY })
          .toFile(output.path);
      }
    }

    let maxBytes = 0;
    for (const output of outputs) {
      const outStat = await stat(output.path);
      maxBytes = Math.max(maxBytes, outStat.size);
      if (outStat.size > WARN_BYTES) {
        console.warn(
          `Warning: ${path.relative(ROOT, output.path)} is ${Math.round(outStat.size / 1024)} KB, over the 200 KB budget`,
        );
      }
    }

    manifest[manifestKey] = { width, height, widths: targetWidths };

    rows.push({
      file: relFromSrc,
      status: upToDate ? "skipped (up to date)" : "generated",
      widths: targetWidths.join(", "),
      "max size": `${Math.round(maxBytes / 1024)} KB`,
    });
  }

  // Sorted keys keep the manifest diff small when only one image changes.
  const sortedManifest = Object.fromEntries(
    Object.keys(manifest)
      .sort()
      .map((key) => [key, manifest[key]]),
  );

  await mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await writeFile(MANIFEST_PATH, `${JSON.stringify(sortedManifest, null, 2)}\n`);

  console.log("");
  console.table(rows);
  console.log(
    `\nWrote manifest with ${Object.keys(sortedManifest).length} image(s) to ${path.relative(ROOT, MANIFEST_PATH)}`,
  );
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exitCode = 1;
});
