
export interface IDirector {
  id: number;
  firstname: string;
  lastname: string;
}

export interface IMovie {
  id: number;
  title: string;
  genre: string;
  year: number;
  director: IDirector;
}