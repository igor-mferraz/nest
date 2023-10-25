import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";

@Catch()
export class FiltroDeExcecaoHttp implements ExceptionFilter {

    private httpAdapter: AbstractHttpAdapter;
    constructor(AdapterHost: HttpAdapterHost){
        this.httpAdapter = AdapterHost.httpAdapter;
    }
    
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();

        const { status, body } = exception instanceof HttpException ?
            {
                status: exception.getStatus(),
                body: exception.getResponse()
            } 
                :
            {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                body: {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    timeStamp: new Date().toISOString(),
                    message: exception.message,
                    path: request.path
                }
            }
        this.httpAdapter.reply(response, body, status);

    }
}