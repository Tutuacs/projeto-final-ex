import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enums';

export const ACESS_KEY = 'access';
export const Access = (...role: Role[]) => SetMetadata(ACESS_KEY, role);
