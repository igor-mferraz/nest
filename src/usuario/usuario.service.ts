import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {

    private usuarios: Usuario[] = [];

    async cria(user: Usuario){
        await this.usuarios.push(user);
        return user;
    }

    async busca(){
        return this.usuarios;
    }

    async buscarPorEmail(email:string){
        const user = this.usuarios.find((item)=>{
            return item.email === email
        })
        return user
    }

    async buscaPorNome(nome:string){
        const user = this.usuarios.find((item)=>{
            return item.nome === nome
        })
        return user
    }
      

}