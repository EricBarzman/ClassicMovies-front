import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../../redux/redux.type";

import { useMovies } from "../../firebase/movies/movieHooks";

import type { ISingleMovieWithAllInfo } from "../../types/movie.type"

import MovieVideo from "../../components/MovieComponents/MovieVideo/MovieVideo";
import AddToMyFavoriteButton from "../../components/MovieComponents/Buttons/AddToFavoriteButton/AddToFavoriteButton";
import RemoveFromFavoriteButton from "../../components/MovieComponents/Buttons/RemoveFromFavoriteButton/RemoveFromFavoriteButton";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import VoteForButton from '../../components/MovieComponents/Buttons/VoteForButton/VoteForButton';


function MoviePage() {

  const [movie, setMovie] = useState<ISingleMovieWithAllInfo>()
  const movieId = useParams().movie_id!;
  
  const favorites = useTypedSelector(state => state.favorites.mesFavoris);
  const favoriteFound = favorites.find(fav => fav.movieId === movieId);
  const isFavorite = favoriteFound !== undefined;

  const { getMovieByIdWithAllInfo } = useMovies();

  const [showVoteModal, setShowVoteModal] = useState(false);


  useEffect(() => {
    getMovieByIdWithAllInfo(movieId).then(data => setMovie(data));
  }, [])

  useEffect(() => {
    document.title = `${movie?.title} | Classic Movies`;
  }, [movie])


  if (!movie) return <LoadingSpinner />

  return (
    <main className="text-white md:p-20 p-2 py-10 mx-auto">

      <h2 className="text-3xl font-semibold mb-6">{movie.title}</h2>

      {/* Trailer */}
      <MovieVideo youtube_id={movie.youtube_url} />

      <section className="mb-6">
        <div className="mt-10 ml-5 mb-10">

          <div className="flex items-center mb-6 text-xl">

            {/* Add to favorites */}
            {!isFavorite && (
              <AddToMyFavoriteButton movieId={movieId} />
            )}

            {isFavorite && (
              <RemoveFromFavoriteButton favoriteId={favoriteFound.id} />
            )}

            <VoteForButton movieId={movie.id}/>
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