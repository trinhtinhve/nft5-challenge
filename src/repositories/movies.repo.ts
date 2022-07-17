import movieModel from '@/models/movies.model';
import sharedMovieModel from '@/models/sharedMovies.model';
import { Movie, SharedMovie } from '@/interfaces/movies.interface';

class MovieRepo {
  public movies = movieModel;
  public sharedMovies = sharedMovieModel;

  public getSharedMovies(): SharedMovie[] {
    return this.sharedMovies;
  }

  public getMoviesByUserId(userId: number): Movie[] {
    return this.movies.filter(movie => movie.userId === userId);
  }
}

export default MovieRepo;
