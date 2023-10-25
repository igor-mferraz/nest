import { IsEmail,IsNotEmpty, IsString } from "class-validator";
import { IsEmailUnique } from "./IsEmailUnique.validator";
import { Exclude, Expose } from "class-transformer";

export class Usuario {
    id: number;
    
    @Expose({
        name: 'name'
    })
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsEmailUnique({
        message: "e-mail deve ser unico!"
    })
    @IsEmail({}, {message:"E-mail não é valido!"})
    email: string;

    @Expose({
        name: 'password'
    })
    @Exclude({
        toPlainOnly: true
    })
    @IsNotEmpty({message:"Campo senha é obrigatório!"})
    senha: string;
    
    @Expose({
        name: 'fullName'
    })
    @IsNotEmpty({
        message: 'O nome é obrigatório!'
    })
    nomeCompleto: string;
    
    @Expose({
        name: 'joinDate'
    })
    dataDeEntrada: Date;

}