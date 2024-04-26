import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const UserAuth = createParamDecorator(
  (filterData: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.user) {
      if (filterData) {
        return request.user[filterData];
      } else {
        return request.user;
      }
    } else {
      throw new NotFoundException(
        'Usuário não encontrado no banco de dados, Use o AuthGuard para obter o usuário',
      );
    }
  },
);
