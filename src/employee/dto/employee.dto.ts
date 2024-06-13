import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import Role from '../../common/constant/role.enum';

export class EmployeeDto {

  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @Length(1, 100)
  name: string;

  @IsNotEmpty({ message: 'Mobile number is required' })
  @IsString()
  @Length(10, 15)
  @Matches(/^\+?\d{10,15}$/, {
    message:
      'Mobile number must be between 10 and 15 digits and can include a leading + for country code',
  })
  mobile: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsString()
  @Length(1, 255)
  address: string;

  @IsNotEmpty({ message: 'Roles are required' })
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Role, { each: true })
  roles: Role[];
}
