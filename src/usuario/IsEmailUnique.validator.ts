import { registerDecorator,ValidationOptions, ValidatorConstraintInterface, ValidationArguments, ValidatorConstraint } from 'class-validator'
import { UsuarioService } from './usuario.service'
import { Injectable } from '@nestjs/common'

@Injectable()
@ValidatorConstraint()
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {

    constructor(private usuarioService: UsuarioService) {}

    async validate(email: string, validationArguments?: ValidationArguments) {
        const emailUser = await this.usuarioService.buscarPorEmail(email);
        if(emailUser){
        //se achar retorna false, pq ai gera um erro com email existente
            return false
        } else {
        //se não tiver retorna true, que pode passar, que o emial não existe
            return true
        }
    }
}

export function IsEmailUnique(validationOptions?: ValidationOptions){
    return function(object: Object, propertyName:string){
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailUniqueConstraint
        })
    }
}