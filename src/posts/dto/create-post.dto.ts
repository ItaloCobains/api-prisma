import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Titulo do post',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Conteudo do post',
  })
  @IsString()
  @IsOptional()
  content?: string | null;

  @ApiProperty({
    description: 'Email do author do post',
  })
  @IsEmail()
  autorEmail: string;
}
