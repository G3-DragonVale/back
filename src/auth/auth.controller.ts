import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDtoAuth } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: LoginDtoAuth ) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginDtoAuth) {
    const user = await this.authService.validateUser(body.nickname, body.mdp);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(user);
  }
}
