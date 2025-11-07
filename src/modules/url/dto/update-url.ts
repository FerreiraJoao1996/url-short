import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateUrlDTO {
    @IsOptional()
    @IsString()
    @MaxLength(50)

    @IsString()
    shortUrl: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    newShortUrl?: string;

    @IsOptional()
    @IsString()
    url?: string;

};
