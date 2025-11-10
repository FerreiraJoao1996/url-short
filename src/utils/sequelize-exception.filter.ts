import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
    ValidationError,
    UniqueConstraintError,
    ForeignKeyConstraintError,
    DatabaseError,
} from 'sequelize';

@Catch(
    ValidationError,
    UniqueConstraintError,
    ForeignKeyConstraintError,
    DatabaseError,
)
export class SequelizeExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Erro interno no banco de dados.';

        if (exception instanceof UniqueConstraintError) {
            status = HttpStatus.CONFLICT;
            message = 'Registro duplicado. Algum campo único já existe.';
        } else if (exception instanceof ForeignKeyConstraintError) {
            status = HttpStatus.BAD_REQUEST;
            message = 'Referência inválida. Chave estrangeira não encontrada.';
        } else if (exception instanceof ValidationError) {
            status = HttpStatus.BAD_REQUEST;
            message = exception.errors.map((err) => err.message).join(', ');
        } else if (exception instanceof DatabaseError) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = exception.message;
        }

        response.status(status).json({
            statusCode: status,
            message,
            error: exception.name,
        });
    }
}
