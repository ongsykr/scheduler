import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { refreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() body: loginDto) {
    return this.authService.login(body);
  }

  // {
  //   "title": "Morning Run",
  //   "body": "Run 5 kilometers around the park.",
  //   "startingDate": "2024-08-05T06:30:00.000Z",
  //   "endingDate": "2024-08-05T07:30:00.000Z",
  //   "cycle": 1
  // }

  @Post('/create')
  createUser(@Body() body: loginDto) {
    return this.authService.create(body.id, body.password, body.name);
  }

  @Post('/refresh')
  refresh(@Body() body: refreshTokenDto) {
    return this.authService.refresh(body.refresh);
  }
}
