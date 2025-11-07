import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth.guard";

export function Logged() {
    return applyDecorators(UseGuards(AuthGuard));
}