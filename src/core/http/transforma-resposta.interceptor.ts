import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { NestResponse } from "./nest-response";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";

@Injectable()
export class TransformaRespotaInterceptor implements NestInterceptor {

    private httpAdapter: AbstractHttpAdapter;
    constructor(AdapterHost: HttpAdapterHost){
        this.httpAdapter = AdapterHost.httpAdapter;
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        return next.handle()
            .pipe(
                map((resostaController: NestResponse) => {
                    if (resostaController instanceof NestResponse) {
                        const ctx = context.switchToHttp();
                        const res = ctx.getResponse();
                        const { headers, status, body } = resostaController;

                        const nomesHeaders = Object.getOwnPropertyNames(headers)

                        nomesHeaders.forEach(nome => {
                            const valor = headers[nome];
                            this.httpAdapter.setHeader(res, nome, valor)
                        });
                        this.httpAdapter.status(res, status)
                        return body;

                    }
                    return resostaController
                })
            )
    }

}