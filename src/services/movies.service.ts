import { SharedMovieDto } from '@/dtos/movies.dto';
import { HttpException } from '@exceptions/HttpException';
import MovieRepo from '@/repositories/movies.repo';
import { Movie } from '@/interfaces/movies.interface';

class MovieService {
  public movieRepo = new MovieRepo();

  // public async getMovies(): Promise<Movie[]> {
    
  // }
  
  // public async shareMovie(): Promise<void> {
    
  // }
}

export default MovieService;
