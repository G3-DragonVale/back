import { ApiProperty } from "@nestjs/swagger";

export enum Rarete {
    COMMUN = "COMMUN",
    RARE = "RARE",
    EPIQUE = "EPIQUE",
    LEGENDAIRE = "LEGENDAIRE",
    MYTHIQUE = "MYTHIQUE",
}

export class CreateDragonDto {
    @ApiProperty()
    nom: string;

    @ApiProperty({ enum: Rarete, default: Rarete.COMMUN })
    rarete?: Rarete = Rarete.COMMUN;
}
