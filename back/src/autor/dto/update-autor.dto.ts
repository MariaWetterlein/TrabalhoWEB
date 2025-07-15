import { IsOptional, IsString } from 'class-validator';

export class UpdateAutorDto {
  @IsOptional()
  @IsString()
  nome?: string;
}
