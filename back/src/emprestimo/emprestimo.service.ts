import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { UpdateEmprestimoDto } from './dto/update-emprestimo.dto';

@Injectable()
export class EmprestimoService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateEmprestimoDto) {
    return this.prisma.emprestimo.create({
      data: {
        nomePessoa: data.nomePessoa,
        livroId: data.livroId,
      },
    });
  }

  findAll() {
    return this.prisma.emprestimo.findMany({
      include: {
        livro: true, 
      },
    });
  }

  findOne(id: number) {
    return this.prisma.emprestimo.findUnique({
      where: { id },
      include: {
        livro: true,
      },
    });
  }

  update(id: number, data: UpdateEmprestimoDto) {
    return this.prisma.emprestimo.update({
      where: { id },
      data: {
        nomePessoa: data.nomePessoa,
        livroId: data.livroId,
      },
    });
  }

  remove(id: number) {
    return this.prisma.emprestimo.delete({
      where: { id },
    });
  }
}
