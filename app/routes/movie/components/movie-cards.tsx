import { useEffect, useRef, useState } from "react"
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "~/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import type { Movie, NowPlayingResponse } from "~/services/movie/types"
import { fetchMovie } from "~/services/movie/getMovie"
import { fetchSearchMovie } from "~/services/movie/searchMovie"
import { Link } from "react-router"
import { useCategory } from "~/hooks/use-category"
import { formatDateLong } from "~/lib/utils"
import ImageView from "~/components/ImageView"

export function MovieCards({ initialList, search, limit }: { initialList: NowPlayingResponse["results"], search: string, limit?: boolean }) {
  const [movies, setMovies] = useState<Movie[]>(initialList)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef<HTMLDivElement | null>(null)
  const category = useCategory();

  const loadMore = async (query: string, pageToLoad: number) => {
    try {
      const res: NowPlayingResponse = query
        ? await fetchSearchMovie(query, pageToLoad)
        : await fetchMovie(pageToLoad, category)

      if (pageToLoad === 1) {
        setMovies(res.results)
      } else {
        setMovies((prev) => [...prev, ...res.results])
      }

      setHasMore(res.page < res.total_pages)
      setPage(pageToLoad)
    } catch (err) {
      setHasMore(false)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !limit) {
          loadMore(search, page + 1)
        }
      },
      { threshold: 1 }
    )

    const currentLoader = loaderRef.current
    if (currentLoader) observer.observe(currentLoader)

    return () => {
      if (currentLoader) observer.unobserve(currentLoader)
    }
  }, [loaderRef, hasMore, page, search])

  useEffect(() => {
    if (search) {
      loadMore(search, 1)
    }
  }, [search])

  useEffect(() => {
    if (search.length === 0) {
      setMovies(initialList)
      setPage(1)
      setHasMore(true)
    }
  }, [search, initialList])

  return (
    <>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-5">
        {(limit ? movies.slice(0, 5) : movies).map((movie: Movie) => (
          <Link key={movie.id} to={`/movie/${movie.title.toLowerCase().replace(/\s+/g, "-")}-${movie.id}`} className="group">
            <Card key={movie.id} className="data-[slot=card]:bg-gradient-to-t shadow-md py-0 pb-4 overflow-hidden transition-all ease-in-out duration-300 hover:shadow-xl h-full">
              <ImageView
                  path={movie.poster_path}
                  baseSize="/w500"
                  width={200}
                  height={300}
                  className="rounded-t-lg"
                />
              <div className="flex flex-col justify-between flex-1">
                <CardHeader>
                  <CardTitle>{movie.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {movie.overview.slice(0, 100)}...
                </CardContent>
                <CardFooter className="flex items-center justify-between px-4">
                  <Badge variant="secondary">{formatDateLong(movie.release_date)}</Badge>
                  <div className="flex items-center gap-2">
                    {movie.vote_average >= 7 ? (
                      <IconTrendingUp className="text-green-500" />
                    ) : (
                      <IconTrendingDown className="text-red-500" />
                    )}
                    {movie.vote_average.toFixed(1)}
                  </div>
                </CardFooter>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      {(hasMore && !limit) && (
        <div ref={loaderRef} className="h-20 flex items-center justify-center text-muted-foreground">
          Loading...
        </div>
      )}
    </>
  )
}
