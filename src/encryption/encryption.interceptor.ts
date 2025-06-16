import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EncryptionService } from './encryption.service';

@Injectable()
export class EncryptionInterceptor implements NestInterceptor {
  constructor(private encryptionService: EncryptionService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        // On ne chiffre pas si la réponse est undefined ou null
        if (data === undefined || data === null) {
          return data;
        }
        
        // Structure pour le résultat chiffré
        return {
          encrypted: true,
          // data: this.encryptionService.encrypt(data)
          data: data
        };
      }),
    );
  }
}