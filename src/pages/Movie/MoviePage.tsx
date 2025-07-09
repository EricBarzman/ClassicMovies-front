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
import { IVote } from "../../types/user.type";
import { useVotes } from "../../firebase/users/userHook";
import { shuffleArr } from "../../utils/shuffleArray";


function MoviePage() {

  const [movie, setMovie] = useState<ISingleMovieWithAllInfo>();
  const movieId = useParams().movie_id!;

  const [votesForMovie, setVotesForMovie] = useState<IVote[]>([]);

  const user = useTypedSelector(state => state.user);
  const favorites = useTypedSelector(state => state.favorites.mesFavoris);
  const favoriteFound = favorites.find(fav => fav.movieId === movieId);
  const isFavorite = favoriteFound !== undefined;

  const { getMovieByIdWithAllInfo } = useMovies();
  const { getVotesForOneMovie } = useVotes();

  useEffect(() => {
    getMovieByIdWithAllInfo(movieId).then(data => setMovie(data));
    getVotesForOneMovie(movieId).then(data => {
      shuffleArr(data);
      setVotesForMovie(data)
    });
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
            {user.logged && !isFavorite && (
              <AddToMyFavoriteButton movieId={movieId} />
            )}

            {user.logged && isFavorite && (
              <RemoveFromFavoriteButton favoriteId={favoriteFound.id} />
            )}

            {/* Rate movie */}
            {user.logged && <VoteForButton movieId={movie.id} />}
          </div>

          {/* Information */}
          <div className="w-full md:w-1/2">

            <div className="flex justify-between mb-6">

              {/* Encart à gauche */}
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

              {/* Encart à droite */}
              <div className="mr-4">
                <p><span className="text-gray-500">Genre :</span> {movie.genre.label}</p>
                <p className="mb-3"><span className="text-gray-500">Country:</span> {movie.country.name}</p>
              </div>

            </div>

            {/* Votes */}
            {/* <div>
              <h3 className="font-semibold text-gray-400">Votes du public</h3>
              <p className="text-sm ">
                Note globale: <span>{votesForMovie.reduce((acc, curr) => acc += curr.value, 0)}</span>
              </p>

            </div> */}
          </div>

        </div>

        {/* Reviews */}
        {/* {votesForMovie.length > 0 && (
          votesForMovie.slice(0, 5).map((vote) => (
            <CommentCard key={vote.id} vote={vote} />
          ))
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