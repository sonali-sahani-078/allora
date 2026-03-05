import { sanityConfig } from "./sanity";

type ImageOptions = {
  width?: number;
  height?: number;
};

const parseAssetRef = (ref: string): { id: string; ext: string } | null => {
  const parts = ref.split("-");
  if (parts.length < 4 || parts[0] !== "image") {
    return null;
  }

  const dimensions = parts[parts.length - 2];
  if (!/^\d+x\d+$/.test(dimensions)) {
    return null;
  }

  const ext = parts[parts.length - 1];
  const id = parts.slice(1, -2).join("-");

  if (!id || !/^[a-z0-9]+$/i.test(ext)) {
    return null;
  }

  return { id, ext };
};

export const buildSanityImageUrl = (
  assetRef?: string,
  options?: ImageOptions,
): string | null => {
  if (!assetRef || !sanityConfig.projectId || !sanityConfig.dataset) {
    return null;
  }

  const parsed = parseAssetRef(assetRef);
  if (!parsed) {
    return null;
  }

  const params = new URLSearchParams();
  if (options?.width) {
    params.set("w", String(options.width));
  }
  if (options?.height) {
    params.set("h", String(options.height));
  }
  params.set("fit", "crop");
  params.set("auto", "format");

  const query = params.toString();
  const base = `https://cdn.sanity.io/images/${sanityConfig.projectId}/${sanityConfig.dataset}/${parsed.id}.${parsed.ext}`;

  return query ? `${base}?${query}` : base;
};
