import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateDiaryDto {
  @IsString()
  alcholType: string;

  @IsNumber()
  amount: number;

  @IsString()
  amountType: string;

  @IsString()
  withWhom: string;

  @IsString()
  where: string;

  @IsString()
  @IsOptional()
  why: string;

  @IsString()
  @IsOptional()
  food: string;

  @IsString()
  @IsOptional()
  thought: string;
}
