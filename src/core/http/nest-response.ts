export class NestResponse {
    status:number;
    headers: Object;
    body: Object;


    constructor(resposta: NestResponse){
        Object.assign(this, resposta)

        // funcao acima faz a mesma coisa que a de baixo 
        // this.status = resposta.status
        // this.headers = resposta.headers
        // this.body = resposta.body
    }
}