
export interface IDirector {
  id: string;
  firstName: string;
  lastName: string;
  countryId: string;
}

export interface IGenre {
  id: string;
  label: string;
  slug: string;
  createdAt: string;
}

export interface IKeyword {
  id: string;
  label: string;
}

export interface ICountry {
  id: string;
  name: string;
  regionId: string;
  createdAt: string;
}

export interface IMovie {
  id: string;
  title: string;
  slug: string;
  genreId: string;
  decadeChoice: string;
  get_image: string;
  keywords: string[];
  shortDescription: string;
  keywordsList: IKeyword[];
  year: number;
  directorId: string;
  director: IDirector;
  youtube_url: string;
}

export interface IMovie {
  id: string;
  title: string;
  slug: string;
  genreId: string;
  decadeChoice: string;
  get_image: string;
  keywords: string[];
  shortDescription: string;
  keywordsList: IKeyword[];
  year: number;
  directorId: string;
  director: IDirector;
  youtube_url: string;
}

export interface ISingleMovieWithAllInfo {
  id: string;
  title: string;
  slug: string;
  genreId: string;
  genre: IGenre;
  decadeChoice: string;
  get_image: string;
  keywords: string[];
  country : ICountry;
  shortDescription: string;
  keywordsList: IKeyword[];
  year: number;
  directorId: string;
  director: IDirector;
  youtube_url: string;
}


export interface IMovieWithVotes {
  id: string;
  title: string;
  slug: string;
  genreId: string;
  decadeChoice: string;
  get_image: string;
  keywords: string[];
  shortDescription: string;
  keywordsList: IKeyword[];
  year: number;
  directorId: string;
  director: IDirector;
  youtube_url: string;
  votes: number;
}