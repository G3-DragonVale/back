import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    nickname: string;

    @ApiProperty()
    mdp: string;
}
