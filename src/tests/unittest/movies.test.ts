import MovieService from '../../services/movies.service';
import MovieRepo from '../../repositories/movies.repo';

jest.mock('../../repositories/movies.repo');

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Testing MovieSevice', () => {
  describe('getMovies', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should get shared movies', async () => {
      MovieRepo.prototype.getSharedMovies = jest.fn(() => {
        return [
          {
            id: 1,
            movieId: 1,
            sharedby: 'sharedby',
          },
        ];
      });

      MovieRepo.prototype.getMovie = jest.fn(() => {
        return { id: 1, url: 'www.youtube.com/watch?v=1', userId: 1, title: 'Movie 1', like: 3, dislike: 3, description: 'des 1' };
      });

      const sampleResult = [
        {
          id: 1,
          url: 'www.youtube.com/watch?v=1',
          userId: 1,
          title: 'Movie 1',
          like: 3,
          dislike: 3,
          description: 'des 1',
          sharedBy: 'sharedby',
        },
      ];

      const movieService = new MovieService();
      const result = await movieService.getMovies(undefined);

      expect(result).toEqual(sampleResult);
    });

    it('should get movies of user', async () => {
      const movie = { id: 1, url: 'www.youtube.com/watch?v=1', userId: 1, title: 'Movie 1', like: 3, dislike: 3, description: 'des 1' };

      MovieRepo.prototype.getMoviesByUserId = jest.fn(() => {
        return [movie];
      });

      const sampleResponse = [movie];

      const movieService = new MovieService();
      const result = await movieService.getMovies({
        id: 1,
        email: 'example1@email.com',
        password: '$2b$10$TBEfaCe1oo.2jfkBDWcj/usBj4oECsW2wOoDXpCa2IH9xqCpEK/hC',
      });

      expect(result).toEqual(sampleResponse);
    });
  });

  describe('shareMovie', () => {
    // should be the same with test cases of getMovies above.
  });
});
