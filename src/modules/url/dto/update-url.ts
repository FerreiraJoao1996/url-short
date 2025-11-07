import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUrlDTO {
    @ApiPropertyOptional({
        description: "URL curta atual",
        minLength: 3,
        maxLength: 30,
        example: "UQy2Fk"
    })
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    shortUrl: string;

    @ApiPropertyOptional({
        description: "Nova URL curta que será atualizada",
        maxLength: 30,
        example: "Ab12Cd"
    })
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    newShortUrl?: string;

    @ApiPropertyOptional({
        description: "URL original",
        maxLength: 200,
        example: "https://www.google.com"
    })
    @IsOptional()
    @IsString()
    url?: string;
}
