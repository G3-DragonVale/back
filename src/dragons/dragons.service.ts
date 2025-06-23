import { Injectable } from '@nestjs/common';
import { CreateDragonDto } from './dto/create-dragon.dto';
import { UpdateDragonDto } from './dto/update-dragon.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDragonDto } from './dto/user-dragon.dto';

@Injectable()
export class DragonsService {
  constructor(private prisma: PrismaService) { }

  create(createDragonDto: CreateDragonDto) {
    return this.prisma.dragon.create({ data: createDragonDto });
  }

  findAll() {
    return this.prisma.dragon.findMany();
  }

  findOne(id: number) {
    return this.prisma.dragon.findUnique({ where: { id } });
  }

  update(id: number, updateDragonDto: UpdateDragonDto) {
    return this.prisma.dragon.update({
      where: { id },
      data: updateDragonDto,
    });
  }

  remove(id: number) {
    return this.prisma.dragon.delete({ where: { id } });
  }

  findByName(name) {
    return this.prisma.dragon.findMany({ where: { nom: name } });
  }

  findByUserId(userId: number) {
    return this.prisma.dragon.findMany({
      where: { owners: { some: { userId: userId } } },
    });
  }

  addUserDragon(addUserDragonDto: UserDragonDto) {
    return this.prisma.userDragon.create({
      data: {
        userId: addUserDragonDto.userId,
        dragonId: addUserDragonDto.dragonId,
      },
    });
  }

  removeUserDragon(removeUserDragonDto: UserDragonDto) {
    return this.prisma.userDragon.delete({
      where: {
        userId_dragonId: {
          userId: removeUserDragonDto.userId,
          dragonId: removeUserDragonDto.dragonId,
        },
      },
    });
  }
}
