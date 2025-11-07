import { applyDecorators } from "@nestjs/common";
import { ApiNotFoundResponse, ApiParam, ApiResponse } from "@nestjs/swagger";

export function RedirectUrlSwagger() {
    return applyDecorators(
        ApiParam({
            name: "short",
            description: "Código da URL curta",
            type: String,
            example: "UQy2Fk"
        }),
        ApiResponse({
            status: 307,
            description: "Redirecionamento para a URL original",
            content: {
                "text/plain": {
                    example: "Redirecionando para: https://www.google.com"
                }
            }
        }),
        ApiNotFoundResponse({
            description: "A URL não foi encontrada",
            example: {
                statusCode: 404,
                error: "Not Found",
                message: "A URL não foi encontrada."
            }
        })
    );
}
