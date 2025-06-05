import { Module } from '@nestjs/common';
import { DragonsService } from './dragons.service';
import { DragonsController } from './dragons.controller';
import { PrismaModule } from 'src/prisma/prisma.module'; 


@Module({
  controllers: [DragonsController],
  providers: [DragonsService],
  imports: [PrismaModule],
})
export class DragonsModule {}
