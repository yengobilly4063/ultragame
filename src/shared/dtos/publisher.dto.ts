import {
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreatePublisherDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsInt()
  @IsNotEmpty({ message: 'Siret is required' })
  @Min(10000000000000, {
    message: 'siret must be at least 14 digits with first digit being > 0',
  })
  @Max(99999999999999, { message: 'siret must be (min/max) 14 digits' })
  siret: number;
}
