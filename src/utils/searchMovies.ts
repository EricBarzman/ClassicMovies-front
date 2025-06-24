import { IMovie } from "../types/movie.type";

/**
 * L'algorithme de recherche de ClassicMovies.
 * Il remplace une recherche SQL,
 * la BDD Firebase NoSQL ne permettant pas une recherche efficace.
 * 
 * @param input La chaîne de recherche
 * @param movies Les films parmi lesquels on cherche
 * @returns 
 */
function searchMoviesFromInput(input: string, movies: IMovie[]): IMovie[] {
  return movies.filter(movie =>
    // Le titre contient-il l'input ?
    movie.title.toLowerCase().includes(input.toLowerCase()) ||
    // Le nom réal contient-il l'input ?
    movie.director.lastName.toLowerCase().includes(input.toLowerCase()) ||
    movie.director.firstName.toLowerCase().includes(input.toLowerCase())
  )
}

export default searchMoviesFromInput;