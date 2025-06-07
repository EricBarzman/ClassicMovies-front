import { Link } from "react-router-dom";
import type { IMovie } from "../../../types/movie.type";
import { useState } from "react";
import MoviePreviewCard from "../MoviePreviewCard/MoviePreviewCard";

function MovieCard({ movie }: { movie: IMovie }) {

  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <>
      <article
        className='w-[245px] relative mx-1 mb-6'
        onMouseEnter={() => toggleModal()}
        onMouseLeave={() => toggleModal()}
      >
        {showModal && <MoviePreviewCard isShown={showModal} movie={movie} />}

        <Link to={'/movies/' + movie.slug}>
          <img className='rounded-lg' src={`./assets/${movie.get_image}`} alt="movie image" />
        </Link>

        <h2 className='font-semibold'>{movie.title}</h2>

        <p className='text-gray-700 mt-3'>{movie.year}</p>

        <p className='text-sm text-gray-400'>
          Dir. by <span className='font-semibold'>{movie.director.firstName} {movie.director.lastName}</span>
        </p>

      </article>
    </>
  )
}

export default MovieCard