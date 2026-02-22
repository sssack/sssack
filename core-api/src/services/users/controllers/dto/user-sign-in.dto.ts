import { IsNotEmpty, IsString } from 'class-validator';

export class UserSignInDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
