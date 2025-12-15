import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LoginDto, SignupDto } from '../../common/dto/user.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return await this.usersService.login(loginDto);
  }

  @Post('/signup')
  @HttpCode(HttpStatus.OK)
  async signup(@Body() signupDto: SignupDto) {
    return await this.usersService.signup(signupDto);
  }
}

