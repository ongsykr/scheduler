import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { loginDto } from './dto/login.dto';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(logger: loginDto) {
    const user = await this.authRepository.findUser(logger.id);
    const PasswordMatching = await bcrypt.compare(
      logger.password,
      user.password,
    );

    if (!PasswordMatching) {
      throw new UnauthorizedException('Invalid password');
    }

    let accessToken = this.getAccessToken({ user });
    let refreshToken = this.getRefreshToken({ user });

    return { accessToken, refreshToken };
  }

  getRefreshToken({ user }) {
    return this.jwtService.sign(
      {
        id: user.id,
      },
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_KEY'),
        expiresIn: this.configService.get<number>('REFRESH_TOKEN_EXPIRES_IN'),
      },
    );
  }

  getAccessToken({ user }) {
    const accessToken = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_KEY'),
        expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN'),
      },
    );
    return accessToken;
  }

  async create(id: string, password: string, name: string) {
    let user = this.authRepository.findUser(id);
    if (!user) {
      throw new ConflictException(`${id} already exists`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.authRepository.createUser(id, hashedPassword, name);
  }

  async refresh(refresh: string) {
    const secret = this.configService.get<string>('REFRESH_TOKEN_KEY');
    if (!this.jwtService.verify(refresh, { secret })) {
      throw new UnauthorizedException('Invalid RefreshToken');
    }
    const data = this.jwtService.decode(refresh);
    const user = await this.authRepository.findUser(data.id);
    const newAccess = await this.getAccessToken({ user });
    return newAccess;
  }

  // async logout(id: string) {
  //   const user = await this.authRepository.findUser(id);
  //   if (!user) {
  //     throw new ConflictException(`${id} doesn't exist`);
  //   }
  //   return 'success logout';
  // }
}
