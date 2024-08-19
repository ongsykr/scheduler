import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { refreshTokenDto } from './dto/refreshToken.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({
    summary: 'log in',
    description: 'Enter id and password to log in.',
  })
  @ApiBody({ type: loginDto })
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

  @ApiOperation({
    summary: 'sign in',
    description: 'Enter id and password to sign in.',
  })
  @ApiBody({ type: loginDto })
  @Post('/create')
  createUser(@Body() body: loginDto) {
    return this.authService.create(body.id, body.password, body.name);
  }

  @ApiOperation({
    summary: 'refresh Token',
    description: 'Enter refresh token to get new access token.',
  })
  @ApiBody({ type: refreshTokenDto })
  @Post('/refresh')
  refresh(@Body() body: refreshTokenDto) {
    return this.authService.refresh(body.refresh);
  }
}
