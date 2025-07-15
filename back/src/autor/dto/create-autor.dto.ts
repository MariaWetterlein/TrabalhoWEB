import { IsNotEmpty } from 'class-validator';

export class CreateAutorDto {
  @IsNotEmpty()
  nome: string;
}
