  
import { IsNotEmpty,IsString, MaxLength, MinLength, Matches } from 'class-validator';

export class RegisterDTO {
 
  name:string;
  @IsNotEmpty({message:'Email Required'})
  @IsString()
  email: string;
  @IsNotEmpty({message:'Phone Required'})
  phone:string;
  @IsNotEmpty({message:'Type Required'})
  user_type:string;
  @IsNotEmpty({message:'Password Required'})
  @IsString()
  @MinLength(8, { message: 'Password is too short (8 characters min)' })
  @MaxLength(20, { message: 'Password is too long (20 characters max)' })
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'Weak password' },
)
  password: string;

  status:string;
  
}