import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthedRequest } from "../dto/auth-request";

export const User = createParamDecorator((_: unknown, context: ExecutionContext) => {
    const request: AuthedRequest = context.switchToHttp().getRequest();

    return request.user;
});