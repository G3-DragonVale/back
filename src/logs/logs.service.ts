import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LogsService {
 constructor(private prisma: PrismaService) { }
   create(createLogDto: CreateLogDto) {
     return this.prisma.logs.create({ data: createLogDto });
   }
 
   findAll() {
     return this.prisma.logs.findMany({orderBy: { date: 'desc' }});
   }

   findOne(id: number) {
     return this.prisma.logs.findUnique({ where: { id } });
   }
 
   update(id: number, updateLogDto: UpdateLogDto) {
     return this.prisma.logs.update({
       where: { id },
       data: updateLogDto,
     });
   }
 
   remove(id: number) {
     return this.prisma.logs.delete({ where: { id } });
   }
 
}
