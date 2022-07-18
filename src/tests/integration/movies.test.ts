import request from 'supertest';
import App from '../../app';
import MovieRoute from '../../routes/movies.route';
import { CreateUserDto } from '@dtos/users.dto';
import AuthRoute from '@routes/auth.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

const login = async (app: App): Promise<string> => {
  const userData: CreateUserDto = {
    email: 'example1@email.com',
    password: 'password',
  };

  const response = await request(app.getServer()).post('/login').send(userData);
  return response.header['set-cookie'][0].split(';')[0].split('=')[1] as string;
};

describe('Testing Movies', () => {
  describe('[GET] /movies', () => {
    it('response Movies for vistor', async () => {
      const moviesRoute = new MovieRoute();
      const app = new App([moviesRoute]);

      const sampleResponse = {
        data: [
          {
            id: 1,
            url: 'www.youtube.com/watch?v=1',
            userId: 1,
            title: 'Movie 1',
            like: 3,
            dislike: 3,
            description: 'des 1',
            sharedBy: 'example1@email.com',
          },
        ],
      };

      return request(app.getServer())
        .get(`${moviesRoute.path}`)
        .expect(200)
        .then(res => {
          expect(res.body).toEqual(sampleResponse);
        });
    });

    it('response Movies for siged user', async () => {
      const authRoute = new AuthRoute();
      const moviesRoute = new MovieRoute();
      const app = new App([authRoute, moviesRoute]);

      const token = await login(app);

      const sampleResponse = {
        data: [
          {
            id: 1,
            url: 'www.youtube.com/watch?v=1',
            userId: 1,
            title: 'Movie 1',
            like: 3,
            dislike: 3,
            description: 'des 1',
          },
          {
            id: 2,
            url: 'www.youtube.com/watch?v=2',
            userId: 1,
            title: 'Movie 2',
            like: 4,
            dislike: 4,
            description: 'des 2',
          },
          {
            id: 3,
            url: 'www.youtube.com/watch?v=3',
            userId: 1,
            title: 'Movie 3',
            like: 5,
            dislike: 5,
            description: 'des 3',
          },
          {
            id: 4,
            url: 'www.youtube.com/watch?v=4',
            userId: 1,
            title: 'Movie 4',
            like: 6,
            dislike: 6,
            description: 'des 4',
          },
        ],
      };

      return request(app.getServer())
        .get(`${moviesRoute.path}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then(res => {
          expect(res.body).toEqual(sampleResponse);
        });
    });
  });

  describe('[POST] /movies/shared', () => {
    it('the movie should be shared successfully', async () => {
      const authRoute = new AuthRoute();
      const moviesRoute = new MovieRoute();
      const app = new App([authRoute, moviesRoute]);

      const payload = {
        movieUrl: 'www.youtube.com/watch?v=1',
      };

      const token = await login(app);
      const sampleResponse = { data: { id: 2, movieId: 1, sharedby: 'example1@email.com' } };

      return request(app.getServer())
        .post(`${moviesRoute.path}/shared`)
        .set('Authorization', `Bearer ${token}`)
        .send(payload)
        .expect(200)
        .then(res => {
          expect(res.body).toEqual(sampleResponse);
        });
    });
  });
});
