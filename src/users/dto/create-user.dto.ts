import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    nom: string;

    @ApiProperty()
    prenom: string;

    @ApiProperty()
    mdp: string;
}
