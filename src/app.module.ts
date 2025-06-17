import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { DragonsModule } from './dragons/dragons.module';
import { LogsModule } from './logs/logs.module';
import { AuthModule } from './auth/auth.module';
import { LogMiddleware } from './midlleware/log.middleware';
import { JwtModule } from '@nestjs/jwt';
import { EncryptionModule } from './encryption/encryption.module';
import { EncryptionInterceptor } from './encryption/encryption.interceptor';
import { EncryptionService } from './encryption/encryption.service';

@Module({
  imports: [
    PrismaModule, 
    UsersModule, 
    DragonsModule, 
    LogsModule, 
    AuthModule, 
    JwtModule, 
    EncryptionModule
  ],
  controllers: [AppController],
   providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useFactory: (encryptionService: EncryptionService) => {
        return new EncryptionInterceptor(encryptionService);
      },
      inject: [EncryptionService],
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}