import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import Role from '../../common/constant/role.enum';

export class MemberDto {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString()
  @Length(1, 100)
  username: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @Length(8, 255, { message: 'Password must be between 8 and 255 characters' })
  password: string;

  @IsNotEmpty({ message: 'Roles are required' })
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Role, { each: true })
  roles: Role[];
}
