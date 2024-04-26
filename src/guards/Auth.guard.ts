import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '../decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const data = await this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );

      const token = await this.prisma.findUniqUser(data.id);

      if (
        token.typeRole !== data.typeRole &&
        token.cadastroId !== data.cadastroId &&
        token.email !== data.email
      ) {
        throw new UnauthorizedException(
          'O usuário não bate com as informações contidas no banco',
        );
      }

      request.user = data;

      return true;
    } catch {
      return false;
    }
  }
}
