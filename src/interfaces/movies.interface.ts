export interface Movie {
  id: number;
  userId: number;
  url: string;
  title: string;
  like: number;
  dislike: number;
  description: string;
}

export interface SharedMovie {
  id: number;
  movieId: number;
  sharedby: string;
}
