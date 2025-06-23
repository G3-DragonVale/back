import { ApiProperty } from '@nestjs/swagger';

export class UserDragonDto {
    @ApiProperty()
    userId: number;

    @ApiProperty()
    dragonId: number;
}
