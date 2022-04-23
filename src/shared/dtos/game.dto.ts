import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString({ each: true })
  @IsArray()
  tags: string[];

  @Type(() => Date)
  @IsDate()
  releaseDate: Date;
}

export class UpdateGameDto extends PartialType(CreateGameDto) {
  @IsString()
  @IsNotEmpty({
    message: '$property should not be empty if $property variable is provided',
  })
  @IsOptional()
  publisherId: string;
}
