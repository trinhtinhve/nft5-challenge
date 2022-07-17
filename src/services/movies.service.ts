import MovieRepo from '@/repositories/movies.repo';
import { SharedMovieDto } from '@/dtos/movies.dto';
import { Movie, MovieResponse, SharedMovie } from '@/interfaces/movies.interface';
import { User } from '@/interfaces/users.interface';
import { HttpException } from '@/exceptions/HttpException';

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

  public async shareMovie(user: User, sharedMovieData: SharedMovieDto): Promise<SharedMovie> {
    const movies: Movie[] = this.movieRepo.getMoviesByUserId(user.id);

    const sharingMovie: Movie = movies.find(movie => movie.url === sharedMovieData.movieUrl);
    if (!sharingMovie) throw new HttpException(409, "The movie's not belong to you");

    const sharedMovie: SharedMovie = {
      id: this.movieRepo.getNextSharedMovieId(),
      movieId: sharingMovie.id,
      sharedby: user.email,
    };
    this.movieRepo.insertSharedMovie(sharedMovie);

    return sharedMovie;
  }
}

export default MovieService;
