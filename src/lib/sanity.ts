import { createClient } from "@sanity/client";

export const sanityConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? "u6u9ystz",
  dataset: import.meta.env.VITE_SANITY_DATASET ?? "production",
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION ?? "2025-01-01",
  useCdn: true,
};

export const sanityClient = createClient(sanityConfig);

export const hasSanityConfig = Boolean(sanityConfig.projectId && sanityConfig.dataset);
