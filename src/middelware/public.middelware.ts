import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { IS_PUBLIC_KEY } from '../users/decorator/public.decorator';  

@Injectable()
export class PublicMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const isPublic = Reflect.getMetadata(IS_PUBLIC_KEY, req.route?.stack[0]?.handle) || false;

    if (isPublic) {
      console.log('Esta rota é pública.');
    } else {
      console.log('Esta rota é privada.');
    }

    next();
  }
}
export { IS_PUBLIC_KEY };  