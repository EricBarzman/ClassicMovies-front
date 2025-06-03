
export interface IDirector {
  id: number;
  firstName: string;
  lastName: string;
  countryId: string;
}

export interface IMovie {
  id: number;
  title: string;
  slug: string;
  genreId: string;
  decadeChoice: string;
  get_image: string;
  keywords: string[];
  shortDescription: string;
  year: number;
  directorId: string;
  director: IDirector;
  youtube_url: string;
}