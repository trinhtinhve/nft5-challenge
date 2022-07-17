import { IsString } from 'class-validator';

export class SharedMovieDto {
  @IsString()
  public movieUrl: string;
}
