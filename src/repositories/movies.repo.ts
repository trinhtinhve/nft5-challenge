import movieModel from '@/models/movies.model';
import sharedMovieModel from '@/models/sharedMovies.model';
import { Movie, SharedMovie } from '@/interfaces/movies.interface';

class MovieRepo {
  public movies = movieModel;
  public sharedMovies = sharedMovieModel;

  public getMovie(movieId: number) {
    return this.movies.find(movie => movie.id === movieId);
  }

  public getSharedMovies(): SharedMovie[] {
    return this.sharedMovies;
  }

  public getMoviesByUserId(userId: number): Movie[] {
    return this.movies.filter(movie => movie.userId === userId);
  }

  public insertSharedMovie(sharedMovie: SharedMovie): void {
    this.sharedMovies = [...this.sharedMovies, sharedMovie];
  }

  public getNextSharedMovieId(): number {
    return this.sharedMovies.length + 1;
  }
}

export default MovieRepo;
