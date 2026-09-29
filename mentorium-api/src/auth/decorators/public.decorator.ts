import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

// Usage: @Public() above a controller method to allow unauthenticated access
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
