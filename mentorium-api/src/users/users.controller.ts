import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  // No @Public() here — the global JwtAuthGuard protects this by default.
  // A valid Bearer token is required, and req.user is populated by JwtStrategy.
  @Get('me')
  getMe(@CurrentUser() user: Omit<User, 'passwordHash'>) {
    return user;
  }
}
