import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto';
import { env } from 'process';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(login: LoginDto) {
    const user = await this.prisma.findLogin(login);
    return this.createToken(user);
  }

  async register(register: RegisterDto) {
    await this.prisma.existsEmail(register.email);
    const newUser = new CreateUserDto();
    newUser.email = register.email;
    newUser.password = register.password;
    return this.prisma.RegisterUser(newUser);
  }

  createToken(user: {
    id: string;
    email: string;
    typeRole: string;
    typeId: string;
  }) {
    return {
      token: this.jwt.sign(
        {
          id: user.id,
          email: user.email,
          typeRole: user.typeRole,
          typeId: user.typeId,
        },
        {
          expiresIn: '90 days',
          subject: user.id,
          issuer: env.API_ISSUER,
          audience: env.API_AUDIENCE,
        },
      ),
      user: {
        id: user.id,
        email: user.email,
        typeRole: Number(user.typeRole),
        typeId: user.typeId,
      },
    };
  }


  async createPasswordToken(email: string) {
    const user = await this.prisma.findUniqUserByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return {
      token: this.jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        {
          expiresIn: '10 minutes',
          subject: user.email,
          issuer: env.RESET_PASSWORD_ISSUER,
          audience: env.RESET_PASSWORD_AUDIENCE,
        },
      ),
      user,
    };
  }

  async checkPasswordToken(token: string) {
    try {
      const data = this.jwt.verify(token, {
        issuer: env.RESET_PASSWORD_ISSUER,
        audience: env.RESET_PASSWORD_AUDIENCE,
      });

      return data;
    } catch (e) {
      throw new UnauthorizedException('O token não foi identificado');
    }
  }

  async checkToken(token: string) {
    try {
      const data = this.jwt.verify(token, {
        issuer: env.API_ISSUER,
        audience: env.API_AUDIENCE,
      });

      return data;
    } catch (e) {
      throw new UnauthorizedException('O token não foi identificado');
    }
  }

  validToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
