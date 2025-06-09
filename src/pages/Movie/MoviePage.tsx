import { useEffect, useState } from "react"
import type { IMovie, ISingleMovieWithAllInfo } from "../../types/movie.type"
import { useParams } from "react-router-dom";
import { useMovies } from "../../firebase/movies/movieHooks";
import MovieVideo from "../../components/MovieComponents/MovieVideo/MovieVideo";
import { useTypedSelector } from "../../redux/redux.type";
import AddToMyFavoriteButton from "../../components/MovieComponents/AddToFavoriteButton/AddToFavoriteButton";
import RemoveFromFavoriteButton from "../../components/MovieComponents/RemoveFromFavoriteButton/RemoveFromFavoriteButton";


function MoviePage() {

  const [movie, setMovie] = useState<ISingleMovieWithAllInfo>()
  const movieId = useParams().movie_id!;
  const favorites = useTypedSelector(state => state.favorites.mesFavoris);
  const favoriteFound = favorites.find(fav => fav.movieId === movieId);
  const isFavorite = favoriteFound !== undefined;

  const { getMovieByIdWithAllInfo } = useMovies();

  useEffect(() => {
    getMovieByIdWithAllInfo(movieId).then(data => setMovie(data));
  }, [])

  useEffect(() => {
    document.title = `${movie?.title} | Classic Movies`;
  }, [movie])


  if (!movie) return <h2>Loading...</h2>

  return (
    <main className="text-white md:p-20 p-2 py-10 mx-auto">

      <h2 className="text-3xl font-semibold mb-6">{movie.title}</h2>

      {/* Trailer */}
      <MovieVideo youtube_id={movie.youtube_url} />

      <section className="mb-6">
        <div className="mt-10 ml-5 mb-10">

          <div className="flex items-end mb-4">

            {/* Add to favorites */}
            <div className="mb-6 text-xl">
              {!isFavorite && (
                <AddToMyFavoriteButton movieId={movieId} />
              )}

              {isFavorite && (
                <RemoveFromFavoriteButton favoriteId={favoriteFound.id} />
              )}
            </div>

            {/* Vote for movie */}
            {/* <div className="ml-10 mb-4">

              <button
                className='mt-4 rounded-xl px-4 py-2 bg-primary border-2 border-black text-white hover:bg-green-400 transition-all'
                onClick={() => setIsRateMovieModalOpen(true)}
              >
                Rate movie
              </button>

            </div> */}

          </div>

          {/* Information */}
          <div className="w-full md:w-1/2">
            <div className="flex justify-between">

              <div>
                <p className="text-gray-400 mb-3">
                  {movie.director.firstName} {movie.director.lastName}
                  <span className="ml-3">{movie.year}</span>

                  {movie.keywordsList.map(keyword => (
                    <div className="text-white text-sm" key={keyword.id}>{keyword.label}</div>
                  ))}

                </p>
                <p className="text-sm mt-5">{movie.shortDescription}</p>
              </div>

              <div className="mr-4">
                <p><span className="text-gray-500">Genre :</span> {movie.genre.label}</p>
                <p className="mb-3"><span className="text-gray-500">Country:</span> {movie.country.name}</p>
              </div>

            </div>
          </div>

        </div>

        {/* Reviews */}
        {/* {movie.votes && (
            <div className="pl-10 mt-10 w-1/3">

                <h2 className="text-gray-400 mb-3">Ratings</h2>

                {movie.votes.slice(0,3).map((vote) => (
                    <CommentCard key={vote.id} vote={vote} />
                ))}
                
            </div>
            )} */}

      </section>

      {/* RATE MOVIE MODAL */}
      {/* <RateMovieModal
            movie={movie}
            isRateMovieModalOpen={isRateMovieModalOpen}
            setIsRateMovieModalOpen={setIsRateMovieModalOpen}
        />
        <BackDrop isRateMovieModalOpen={isRateMovieModalOpen} /> */}
    </main>
  )
}

export default MoviePage