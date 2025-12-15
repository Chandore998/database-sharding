import { IsString, IsInt, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignupDto {


  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  password: string;


}

