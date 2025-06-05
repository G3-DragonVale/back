import { PartialType } from '@nestjs/swagger';
import { CreateDragonDto } from './create-dragon.dto';

export class UpdateDragonDto extends PartialType(CreateDragonDto) {}
