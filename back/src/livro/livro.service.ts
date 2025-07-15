import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';

@Injectable()
export class LivroService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateLivroDto) {
    return this.prisma.livro.create({
      data,
    });
  }

  findAll() {
    return this.prisma.livro.findMany({
      include: { autor: true }, 
    });
  }

  findOne(id: number) {
    return this.prisma.livro.findUnique({
      where: { id },
      include: { autor: true },
    });
  }

  update(id: number, data: UpdateLivroDto) {
    return this.prisma.livro.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.livro.delete({
      where: { id },
    });
  }
}
