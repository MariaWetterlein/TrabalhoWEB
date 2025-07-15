import { IsOptional, IsNotEmpty, IsInt } from 'class-validator';

export class UpdateLivroDto {
  @IsOptional()
  @IsNotEmpty()
  titulo?: string;

  @IsOptional()
  @IsInt()
  autorId?: number;
}
