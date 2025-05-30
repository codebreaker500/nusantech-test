import { TMDB_API_KEY, TMDB_BASE_URL } from "~/lib/service";
import type { CreditsResponse } from "./type";

export async function fetchCreditsMovie(movie_id : number): Promise<CreditsResponse> {
  const url = `${TMDB_BASE_URL}/movie/${movie_id}/credits?api_key=${TMDB_API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Response("Failed to fetch TMDB movies", { status: 404 });
  }

  return res.json(); // Contains: page, results, total_pages, total_results
}