import { applyDecorators } from "@nestjs/common";
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse } from "@nestjs/swagger";

export function DeleteUrlSwagger() {
    return applyDecorators(
        ApiOkResponse({
            example: {
                success: true
            }
        }),
        ApiNotFoundResponse({
            example: {
                message: "URL inválida ou não existe!",
                error: "Not Found",
                statusCode: 404
            }
        }),
        ApiForbiddenResponse({
            example: {
                message: "Você não possui permissão para deletar esta url.",
                error: "Forbidden",
                statusCode: 403
            }
        })
    );
}