import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EncryptionService } from './encryption.service';

@Injectable()
export class EncryptionInterceptor implements NestInterceptor {
  constructor(private encryptionService: EncryptionService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const sessionId = request.headers['x-session-id'] as string;
    const url = request.url;

    return next.handle().pipe(
      map(async (data) => {
        if (url.includes('/handshake') || data === undefined || data === null) {
          return data;
        }

        const encryptedData = await this.encryptionService.encrypt(
          data,
          sessionId,
        );

        return {
          encrypted: true,
          data: encryptedData,
        };
      }),
    );
  }
}
