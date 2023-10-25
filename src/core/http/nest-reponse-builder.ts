import { NestResponse } from "./nest-response";

export class NestResponseBuilder {
    private resposta:NestResponse = {
        status: 200,
        headers: {},
        body: {}
    }

    comStatus(status: number){
        this.resposta.status = status
        return this
    }

    comHeaders(headers: Object){
        this.resposta.headers = headers
        return this
    }

    comBody(body: Object){
        this.resposta.body = body
        return this
    }

    build(){
        return new NestResponse(this.resposta);
    }



}