import MovieRepo from '@/repositories/movies.repo';
import { SharedMovieDto } from '@/dtos/movies.dto';
import { Movie, MovieResponse, SharedMovie } from '@/interfaces/movies.interface';
import { User } from '@/interfaces/users.interface';

class MovieService {
  public movieRepo = new MovieRepo();

  public async getMovies(user: User): Promise<MovieResponse[]> {
    if (!user) {
      const sharedMovies: SharedMovie[] = this.movieRepo.getSharedMovies();
      const movieResposes: MovieResponse[] = sharedMovies.map(sharedMovie => {
        const movie = this.movieRepo.getMovie(sharedMovie.movieId);
        return { ...movie, sharedBy: sharedMovie.sharedby };
      });

      return movieResposes;
    }

    const movies: Movie[] = this.movieRepo.getMoviesByUserId(user.id);
    return movies;
  }

  // public async shareMovie(): Promise<void> {

  // }
}

export default MovieService;
