import { TMDB_API_KEY, TMDB_BASE_URL } from "~/lib/service";
import type { NowPlayingResponse } from "./types";

export async function fetchSimilarMovie(movie_id : number, page : number = 1): Promise<NowPlayingResponse> {
  const url = `${TMDB_BASE_URL}/movie/${movie_id}/similar?api_key=${TMDB_API_KEY}&page=${page}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Response("Failed to fetch TMDB movies", { status: 404 });
  }

  return res.json(); // Contains: page, results, total_pages, total_results
}