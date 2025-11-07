import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth.guard";

export function OptionalAuthenticated() {
    return applyDecorators(UseGuards(AuthGuard), SetMetadata("isOptional", true));
}