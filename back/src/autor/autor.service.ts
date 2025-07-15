import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';

@Injectable()
export class AutorService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateAutorDto) {
    return this.prisma.autor.create({
      data: {
        nome: data.nome,
      },
    });
  }

  findAll() {
    return this.prisma.autor.findMany();
  }

  findOne(id: number) {
    return this.prisma.autor.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdateAutorDto) {
    return this.prisma.autor.update({
      where: { id },
      data: {
        nome: data.nome,
      },
    });
  }

  remove(id: number) {
    return this.prisma.autor.delete({
      where: { id },
    });
  }
}
