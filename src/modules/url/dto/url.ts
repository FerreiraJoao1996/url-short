import { IsNumber, IsString } from "class-validator";

export class UrlDTO {
  @IsString()
  shortUrl?: string;
  @IsString()
  url?: string;
  @IsString()
  original_url?: string;
  @IsNumber()
  number_clicks?: number;
};
