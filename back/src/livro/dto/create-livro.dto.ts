import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateLivroDto {
  @IsNotEmpty()
  titulo: string;

  @IsInt()
  autorId: number;
}
