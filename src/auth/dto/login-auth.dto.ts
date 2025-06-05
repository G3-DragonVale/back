import { ApiProperty } from '@nestjs/swagger';

export class LoginDtoAuth {
    @ApiProperty()
    nickname: string;

    @ApiProperty()
    mdp: string;
}
