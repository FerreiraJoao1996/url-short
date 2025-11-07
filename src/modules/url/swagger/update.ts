import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse } from "@nestjs/swagger";

export function ApplyUpdateUrlSwagger() {
    return applyDecorators(
        ApiBody({
            description: "Atualização de URL",
            examples: {
                example: {
                    value: {
                        shortUrl: "UQy2Fk",
                        url: "https://www.google.com"
                    }
                }
            }
        }),
        ApiOkResponse({
            example: {
                "url": {
                    id: 6,
                    original_url: "http://:sia.com",
                    short_url: "UQy2Fk",
                    user_id: 1,
                    number_clicks: 0
                }
            }
        }),
        ApiNotFoundResponse({
            example: {
                message: "A url personalizada informada não foi encontrada.",
                error: "Not Found",
                statusCode: 404
            }
        }),
        ApiForbiddenResponse({
            example: {
                message: "Você não possui permissão para editar esta url!",
                error: "Forbidden",
                statusCode: 403
            }
        }),
        ApiBadRequestResponse({
            example: {
                message: "A url informada não é valida.",
                error: "Bad Request",
                statusCode: 400
            }
        }),
    )
}