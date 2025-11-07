import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiConflictResponse, ApiOkResponse } from "@nestjs/swagger";

export function CreateUserSwagger() {
    return applyDecorators(
        ApiBody({
            description: "Criação de usuário",
            examples: {
                login: {
                    value: {
                        name: "João Pedro",
                        lastname: "Ferreira",
                        email: "email@email.com",
                        password: "Mudar@123",
                        confirmPassword: "Mudar@123"
                    }
                }
            }
        }),
        ApiOkResponse({
            example: {
                id: 1,
                name: "João Pedro",
                lastname: "Ferreira",
                email: "email@email.com"
            }
        }),
        ApiConflictResponse({
            example: {
                message: "Já existe um usuário com o e-mail: email@email.com",
                error: "Conflict",
                statusCode: 409
            }
        })
    )
}