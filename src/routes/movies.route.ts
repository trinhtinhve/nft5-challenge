import { Router } from 'express';
import authMiddleware from '@middlewares/auth.middleware';
import optionAuthMiddleware from '@/middlewares/optionAuth.middleware';
import MoviesController from '@/controllers/movies.controller';
import { SharedMovieDto } from '@/dtos/movies.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class MoviesRoute implements Routes {
  public path = '/movies';
  public router = Router();
  public moviesController = new MoviesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, optionAuthMiddleware, this.moviesController.getMovies);
    this.router.post(`${this.path}/shared`, authMiddleware, validationMiddleware(SharedMovieDto, 'body'), this.moviesController.shareMovie);
  }
}

export default MoviesRoute;
