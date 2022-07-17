import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import MovieService from '@/services/movies.service';
class MoviesController {
  public movieService = new MovieService();

  public getMovies = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user: User = req.user;
      const movieResponses = this.movieService.getMovies(user);

      res.status(200).json({ data: movieResponses });
    } catch (error) {
      next(error);
    }
  };

  public shareMovie = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  };
}

export default MoviesController;
