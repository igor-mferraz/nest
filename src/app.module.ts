import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FiltroDeExcecaoHttp } from './common/filtros/filtro-de-excecao-htpp.filter';
import { TransformaRespotaInterceptor } from './core/http/transforma-resposta.interceptor';

@Module({
  imports: [UsuarioModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformaRespotaInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: FiltroDeExcecaoHttp
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ],
})

export class AppModule {}
