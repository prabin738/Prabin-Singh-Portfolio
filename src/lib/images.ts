import manifestJson from "@/generated/image-manifest.json";

export type ImageManifestEntry = {
  width: number;
  height: number;
  widths: number[];
};

type ImageManifest = Record<string, ImageManifestEntry>;

const manifest = manifestJson as ImageManifest;

export function getImage(basePath: string): ImageManifestEntry | undefined {
  return manifest[basePath];
}

export function hasImage(basePath: string): boolean {
  return basePath in manifest;
}
