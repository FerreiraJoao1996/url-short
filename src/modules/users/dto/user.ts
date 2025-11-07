import { IsString } from "class-validator";

export class UserDTO {
  @IsString()
  name: string;
  @IsString()
  lastname: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  confirmPassword?: string;
}