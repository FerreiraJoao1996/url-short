import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";

export function UserUrlsSwagger() {
    return applyDecorators(
        ApiOkResponse({
            example: {
                urls: [
                    {
                        original_url: "https://youtube.com",
                        short_url: "youtube",
                        number_clicks: 0
                    },
                ]
            }
        })
    )
}