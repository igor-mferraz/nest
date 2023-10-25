import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioService } from "./usuario.service";
import { IsEmailUniqueConstraint } from "./IsEmailUnique.validator";


@Module({
    imports: [],
    controllers: [UsuarioController],
    providers: [UsuarioService, IsEmailUniqueConstraint]
})
export class UsuarioModule {}