import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUrlDTO {

    @IsString()
    url: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    shortUrl?: string;

};
