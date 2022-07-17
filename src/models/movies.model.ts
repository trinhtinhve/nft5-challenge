import { Movie } from '@interfaces/movies.interface';

const movieModel: Movie[] = [
  { id: 1, url: 'www.youtube.com/watch?v=1', userId: 1, title: 'Movie 1', like: 3, dislike: 3, description: 'des 1' },
  { id: 2, url: 'www.youtube.com/watch?v=2', userId: 1, title: 'Movie 2', like: 4, dislike: 4, description: 'des 2' },
  { id: 3, url: 'www.youtube.com/watch?v=3', userId: 1, title: 'Movie 3', like: 5, dislike: 5, description: 'des 3' },
  { id: 4, url: 'www.youtube.com/watch?v=4', userId: 1, title: 'Movie 4', like: 6, dislike: 6, description: 'des 4' },
  { id: 5, url: 'www.youtube.com/watch?v=5', userId: 2, title: 'Movie 5', like: 5, dislike: 5, description: 'des 5' },
  { id: 6, url: 'www.youtube.com/watch?v=6', userId: 2, title: 'Movie 6', like: 6, dislike: 6, description: 'des 6' },
];

export default movieModel;
