import { Injectable } from '@nestjs/common';
import { loginDto } from './dto/login.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  login(body: loginDto) {
    const { id, password, name } = body;
    const user = await this.authRE;
  }
}
