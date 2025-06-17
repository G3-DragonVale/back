import { ApiProperty } from "@nestjs/swagger";

export class HandCheckDTO {
    @ApiProperty()
    publicKey: string;
    @ApiProperty()
    sessionId: string;
}
