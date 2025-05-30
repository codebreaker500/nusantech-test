import { TMDB_API_KEY, TMDB_BASE_URL } from "~/lib/service";
import type { MovieDetails } from "./types";

export async function fetchDetailMovie(movie_id : number): Promise<MovieDetails> {
  const url = `${TMDB_BASE_URL}/movie/${movie_id}?api_key=${TMDB_API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Response("Failed to fetch TMDB movies", { status: 404 });
  }

  return res.json(); // Contains: page, results, total_pages, total_results
}