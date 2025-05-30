import { TMDB_API_KEY, TMDB_BASE_URL } from "~/lib/service";
import type { NowPlayingResponse } from "./types";

export async function fetchSearchMovie(query: string, page: number = 1): Promise<NowPlayingResponse> {
  const url = `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}&include_adult=false&language=en-US&api_key=${TMDB_API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Response("Failed to fetch TMDB movies", { status: 404 });
  }

  return res.json(); // Contains: page, results, total_pages, total_results
}