import { fetchMovie } from "~/services/movie/getMovie";
import { MovieCards } from "./components/movie-cards"
import type { NowPlayingResponse } from "~/services/movie/types";
import { useState } from "react";
import SearchBar from "./components/search-bar";
import type { Route } from "./+types/page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Movie List - Nusantech" },
    { name: "description", content: "List Movie you can watch!" },
  ];
}

export async function clientLoader({ params, request }: Route.ClientLoaderArgs) : Promise<NowPlayingResponse> {
   const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const category = params.category || "now_playing";

    return fetchMovie(page, category);
}

clientLoader.hydrate = true as const;

export default function Movie({ loaderData }: Route.ComponentProps) {
  const { results } = loaderData;
  const [movieList, setMovie] = useState(results);
  const [search, setSearch] = useState("");

  const handleSearch = async (query: string) => {
    if (!query) {
      const movie = await fetchMovie(1)
      setMovie(movie.results);

      return;
    }
    setSearch(query);
  };

  return (
    <div className="py-4 md:py-6">
      <SearchBar onSearch={handleSearch} />
      <MovieCards initialList={movieList} search={search} />
    </div>
  )
}
