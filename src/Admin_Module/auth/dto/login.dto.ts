import { IsNotEmpty, IsString, MaxLength, MinLength,Matches } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({ message: 'Email Required' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'Password Required' })
  @IsString()
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'Weak password' },
)
  @MinLength(8, { message: 'Password is too short (8 characters min)' })
  @MaxLength(20, { message: 'Password is too long (20 characters max)' })
  password: string;

  @IsNotEmpty({ message: 'User type Required' })
  @IsString()
  user_type: string;
}
