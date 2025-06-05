import { ApiProperty } from "@nestjs/swagger";

export class CreateLogDto {
    @ApiProperty()
    userId: number;
    @ApiProperty()
    method: string;
    @ApiProperty()
    route: string;
    @ApiProperty()
    date?: Date;
}
