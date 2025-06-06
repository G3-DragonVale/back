import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { DragonsModule } from './dragons/dragons.module';
import { LogsModule } from './logs/logs.module';
import { AuthModule } from './auth/auth.module';
import { LogMiddleware } from './midlleware/log.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, UsersModule, DragonsModule, LogsModule, AuthModule, JwtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}