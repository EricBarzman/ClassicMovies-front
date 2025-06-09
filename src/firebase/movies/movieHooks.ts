import {
  type DocumentData,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  // orderBy,
  updateDoc,
} from "firebase/firestore";
import { db } from "../client";

import {IGenre, ISingleMovieWithAllInfo, type IMovie } from "../../types/movie.type"


export function useMovies() {

  const getMoviesWithDirectorInfo = async () => {
    const ref = collection(db, 'movies');
    const snap = await getDocs(ref);

    // Get directors
    const refDirectors = collection(db, "directors");
    const snapDirectors = await getDocs(refDirectors);
    const directorList = snapDirectors.docs.map(doc => Object.assign(
      {},
      { id: doc.id },
      doc.data()
    ))

    // Get keywords
    const refKeywords = collection(db, 'keywords');
    const snapKeywords = await getDocs(refKeywords);
    const keywordsList = snapKeywords.docs.map(doc => Object.assign(
      {},
      { id: doc.id },
      doc.data() as IMovie
    ))

    return snap.docs.map(doc => Object.assign(
      {},
      {
        id: doc.id,
        director: directorList.find(director => director.id === doc.data().directorId),
        keywordsList: keywordsList.filter(kword => doc.data().keywords.includes(kword.id))
      },
      doc.data() as IMovie,
    ));
  };

  const getMovieByIdWithAllInfo = async (id: string) => {
    const ref = doc(db, 'movies', id);
    const snap = await getDoc(ref);

    // Get all external attributes --eg join--
    const refDirector = doc(db, "directors", snap.data()!.directorId)
    const director = await getDoc(refDirector);
    
    const refGenre = doc(db, "genres", snap.data()!.genreId)
    const genre = await getDoc(refGenre);
    
    const refCountry = doc(db, "countries", snap.data()!.countryId)
    const country = await getDoc(refCountry);

    const refKeywords = collection(db, 'keywords');
    const snapKeywords = await getDocs(refKeywords);
    const keywordsList = snapKeywords.docs.map(doc => Object.assign(
      {},
      { id: doc.id },
      doc.data() as IMovie,
    ))

    return {
      ...snap.data(),
      id,
      director: {
        id: director.id,
        ...director.data()
      },
      country: {
        id: country.id,
        ...country.data()
      },
      genre: {
        id: genre.id,
        ...genre.data()
      },
      keywordsList: keywordsList.filter(kword => snap.data()!.keywords.includes(kword.id))
    } as unknown as ISingleMovieWithAllInfo
  };

  const createMovie = async (data: DocumentData) => {
    const ref = collection(db, 'movies');
    return addDoc(ref, {
      ...data,
      createdAt: Timestamp.fromDate(new Date())
    })
  };

  const updateMovie = async (id: string, data: DocumentData) => {
    const ref = doc(db, 'movies', id);
    return updateDoc(ref, data);
  };

  const deleteMovie = async (id: string) => {
    const ref = doc(db, 'movies', id);
    return deleteDoc(ref);
  };

  return {
    getMoviesWithDirectorInfo,
    getMovieByIdWithAllInfo,
    createMovie,
    updateMovie,
    deleteMovie,
  }
}