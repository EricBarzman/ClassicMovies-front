import { IMovie } from "../types/movie.type";

function searchMoviesFromInput(input: string, movies: IMovie[]): IMovie[] {
  return movies.filter(movie =>
    movie.title.toLowerCase().includes(input)
  )
}

export default searchMoviesFromInput;