import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AutorModule } from './autor/autor.module';
import { LivroModule } from './livro/livro.module';
import { EmprestimoModule } from './emprestimo/emprestimo.module';

@Module({
  imports: [PrismaModule, AutorModule, LivroModule, EmprestimoModule],
})
export class AppModule {}
