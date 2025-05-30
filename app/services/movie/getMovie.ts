import { TMDB_API_KEY, TMDB_BASE_URL } from "~/lib/service";
import type { NowPlayingResponse } from "./types";

export async function fetchMovie(page: number = 1, category : string = 'now_playing'): Promise<NowPlayingResponse> {
  const url = `${TMDB_BASE_URL}/movie/${category}?api_key=${TMDB_API_KEY}&page=${page}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Response("Failed to fetch TMDB movies", { status: 404 });
  }

  return res.json(); // Contains: page, results, total_pages, total_results
}