import type { MovieDetails, NowPlayingResponse } from "~/services/movie/types";
import type { Route } from "./+types/page";
import { fetchDetailMovie } from "~/services/movie/getDetails";
import { Button } from "~/components/ui/button";
import ImageView from "~/components/ImageView";
import { extractIdFromSlug, formatDateLong } from "~/lib/utils";
import type { CreditsResponse } from "~/services/credits/type";
import { fetchCreditsMovie } from "~/services/credits/getCredits";
import { fetchSimilarMovie } from "~/services/movie/getRelatedMovie";
import { MovieCards } from "../movie/components/movie-cards";
import { IconArcheryArrow, IconGitBranch } from "@tabler/icons-react";
import { Link } from "react-router";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: data?.title || "Movie Details - Nusantech" },
    {
      property: "og:title",
      content: data?.title,
    },
    { name: "description", content: data?.overview || "Detailed information about the movie." },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) : Promise<MovieDetails & CreditsResponse & NowPlayingResponse> {
    const movie   = fetchDetailMovie(parseInt(extractIdFromSlug(params.slug), 10));
    const credits = fetchCreditsMovie(parseInt(extractIdFromSlug(params.slug), 10));
    const similars = fetchSimilarMovie(parseInt(extractIdFromSlug(params.slug), 10));

    const [movieRes, creditsRes, similarsRes] = await Promise.all([movie, credits, similars]);

    return {
      ...movieRes,
      ...creditsRes, 
      ...similarsRes,
    };
}

clientLoader.hydrate = true as const;

export default function Detail({ loaderData }: Route.ComponentProps) {
  const { crew, cast, backdrop_path, title, poster_path, release_date, overview } = loaderData;
  const director = crew.find(member => member.job === "Director")?.name || "Unknown Director";
  const crewMembers = crew.filter(member => member.job !== "Director").map(member => member.name).slice(0, 10).join(", ") || "No crew information available.";
  const castName = cast.filter((member) => member.name)
    .map((member) => member.name)
    .slice(0, 10)
    .join(", ");
  const genres = loaderData.genres.map((genre) => genre.name).join(", ");
  const productionCompanies = loaderData.production_companies.map((company) => company.name).join(", ") || "No production company information available.";
  return (
    <>
      <div className="flex flex-col">
        <section className="relative w-full h-[500px]">
          <ImageView
            path={backdrop_path}
            baseSize="/w1920_and_h1080_multi_faces"
            width={1920}
            height={1080}
            className="absolute inset-0"
          />
          <div className="relative z-10 flex items-end h-full px-4 py-8 bg-gradient-to-t from-black md:px-6">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">{title}</h1>
          </div>
        </section>
        <section className="container px-4 py-6 md:px-6 md:py-12">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" size="sm" className="flex items-center">
              <IconArcheryArrow size={16} />
              <Link to="/now_playing" className="ml-2"> Back to Movies </Link>
            </Button>
          </div>
          <div className="grid gap-6 lg:grid-cols-[300px_1fr] lg:gap-12">
            <ImageView
              path={ poster_path}
              baseSize="/w500"
              alt="Movie poster"
              width={300}
              height={450}
              className="rounded-lg shadow-lg"
            />
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Synopsis</h2>
              <p className="text-gray-500 dark:text-gray-400">
                {overview || "No synopsis available for this movie."}
              </p>
              <h2 className="text-3xl font-bold">Cast & Crew</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Director: <span className="font-bold">{ director }</span>
                <br />
                Crew: <span className="font-bold">{ crewMembers }</span>
                <br />
                Cast: {castName || "No cast information available."}
              </p>
              <h2 className="text-3xl font-bold">Release Date</h2>
              <p className="text-gray-500 dark:text-gray-400">{formatDateLong(release_date)}</p>
            </div>
          </div>
        </section>
         <aside className="w-full py-6 px-6 bg-gray-50">
            <h2 className="text-2xl font-bold">Additional Information:</h2>
            <p className="mt-2 text-lg text-gray-700">Genre: {genres}</p>
            <p className="mt-2 text-lg text-gray-700">Production Company: {productionCompanies}</p>
          </aside>
        {
          loaderData.results && loaderData.results.length > 0 && (
            <section className="container px-4 py-6 md:px-6 md:py-12">
              <h2 className="text-3xl font-bold mb-6">Similar Movies</h2>
              <MovieCards search="" initialList={loaderData.results} limit={true} />
            </section>
          )
        }
      </div>
    </>
  )
}
