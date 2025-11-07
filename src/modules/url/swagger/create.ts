import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiOkResponse } from "@nestjs/swagger";

export function CreateUrlSwagger() {
    return applyDecorators(
        ApiBody({
            description: "Criação de URL",
            examples: {
                custom: {
                    summary: "URL Personalizada",
                    value: {
                        url: "https://youtube.com/",
                        shortUrl: "youtube"
                    }
                },
                random: {
                    summary: "URL Aleatória",
                    value: {
                        url: "https://youtube.com/"
                    }
                }
            }
        }),
        ApiOkResponse({
            examples: {
                successCustom: {
                    summary: "URL Personalizada",
                    value: {
                        url: {
                            id: 1,
                            origina_url: "https://youtube.com/",
                            short_url: "youtube",
                            user_id: 1,
                        },
                        shortenedUrl: "http://localhost:3000/youtube"
                    }
                },
                successRandom: {
                    summary: "URL Aleatória",
                    value: {
                        url: {
                            id: 2,
                            long_url: "https://youtube.com/",
                            short_url: "7Mng2Z",
                            user_id: 1,
                        },
                        shortenedUrl: "http://localhost:3000/7Mng2Z"
                    }
                }
            }
        }),
        ApiBadRequestResponse({
            examples: {
                invalidUrl: {
                    summary: "URL Personalizada Inválida",
                    value: {
                        message: "A url personalizada não é valida.",
                        error: "Bad Request",
                        statusCode: 400
                    }
                }
            }
        }),
        ApiConflictResponse({
            example: {
                message: "A url personalizada já existe.",
                error: "Conflict",
                statusCode: 409
            }
        })
    );
}