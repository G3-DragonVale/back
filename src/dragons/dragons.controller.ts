import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DragonsService } from './dragons.service';
import { CreateDragonDto } from './dto/create-dragon.dto';
import { UpdateDragonDto } from './dto/update-dragon.dto';
import { UserDragonDto } from './dto/user-dragon.dto';

@Controller('dragons')
export class DragonsController {
  constructor(private readonly dragonsService: DragonsService) { }

  @Post()
  create(@Body() createDragonDto: CreateDragonDto) {
    return this.dragonsService.create(createDragonDto);
  }

  @Get()
  findAll() {
    return this.dragonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dragonsService.findOne(+id);
  }
  @Get('ByUserId/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.dragonsService.findByUserId(+userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDragonDto: UpdateDragonDto) {
    return this.dragonsService.update(+id, updateDragonDto);
  }

  @Post('userDragon')
  addUserDragon(@Body() addUserDragonDto: UserDragonDto) {
    return this.dragonsService.addUserDragon(addUserDragonDto);
  }

  @Delete('userDragon')
  removeUserDragon(
    @Query('userId') userId: string,
    @Query('dragonId') dragonId: string,
  ) {
    return this.dragonsService.removeUserDragon({
      userId: +userId,
      dragonId: +dragonId,
    });
  }
}
