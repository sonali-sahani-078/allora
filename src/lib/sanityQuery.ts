import { sanityClient } from "./sanity";

export async function fetchSanityQuery<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  const result = await sanityClient.fetch<T | null>(query, params);
  return result ?? null;
}
