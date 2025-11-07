import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";

export function LoginSwagger() {
    return applyDecorators(
        ApiBody({
            description: "Login",
            examples: {
                login: {
                    value: {
                        email: "email@email.com",
                        password: "Mudar@123"
                    }
                }
            }
        }),
        ApiOkResponse({
            examples: {
                success: {
                    summary: "Login efetuado com sucesso.",
                    value: {
                        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqcGZyZWl0YXNzQGhvdG1haWwuY29tIiwiaWF0IjoxNzYyNTQwMTcyLCJleHAiOjE4NDg5NDAxNzJ9.D58Lkr4vdYqPJwOcqMI2MWWILVd2Vqsy2ywqdON5Ke0"
                    }
                }
            }
        }),
        ApiUnauthorizedResponse({
            examples: {
                wrongPass: {
                    summary: "Senha incorreta",
                    value: {
                        message: "A senha informada não é valida!",
                        error: "Unauthorized",
                        statusCode: 401
                    }
                }
            }
        }),
        ApiNotFoundResponse({
            example: {
                message: "Usuário não encontrado!",
                error: "Not Found",
                statusCode: 404
            }
        })
    )
}