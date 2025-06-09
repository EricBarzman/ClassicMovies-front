
export interface IDirector {
  id: number;
  firstName: string;
  lastName: string;
  countryId: string;
}

interface Keyword {
  id: string;
  label: string;
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
  keywordsList: Keyword[];
  year: number;
  directorId: string;
  director: IDirector;
  youtube_url: string;
}