import { User } from '@/interfaces/users.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { NextFunction, Request, Response } from 'express';

class MoviesController {
  public getMovies = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user: User = req.user;

      res.status(200).json({});
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
