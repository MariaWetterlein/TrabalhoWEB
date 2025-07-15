import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEmprestimoDto {
  @IsNotEmpty()
  @IsString()
  nomePessoa: string;

  @IsNotEmpty()
  @IsNumber()
  livroId: number;
}
