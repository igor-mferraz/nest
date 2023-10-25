import { Body, Controller, Post, Get, Param, HttpStatus, NotFoundException } from "@nestjs/common"
import { UsuarioService } from "./usuario.service";
import { Usuario } from "./usuario.entity";
import { NestResponse } from "src/core/http/nest-response";
import { NestResponseBuilder } from "src/core/http/nest-reponse-builder";


@Controller('users')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService) {}

    @Get()
    listarUsers(){
        const users = this.usuarioService.busca()
        
        return users
    }

    @Get('/:nome')
    async buscaPorNome(@Param('nome') nome:string){
        const user = await this.usuarioService.buscaPorNome(nome)
        if(!user){
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: "Usuário não encontrado!"
            })
        }
        return user
    }

    @Post()
    public async cria(@Body() user:Usuario): Promise<NestResponse> {

        const userCreated = await this.usuarioService.cria(user);
        return new NestResponseBuilder()
            .comStatus(HttpStatus.CREATED)
            .comHeaders({
                'Location':`/users/${userCreated.nome}`
            })
            .comBody(userCreated)
            .build()

    }

}