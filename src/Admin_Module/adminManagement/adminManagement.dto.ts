import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class AdminManagementDTO{
    first_name:string;
    last_name:string;
    @IsNotEmpty({ message: 'Email Required' })
    @IsString()
    email: string;
    @IsNotEmpty({ message: 'Password Required' })
    @IsString()
    @MinLength(8, { message: 'Password is too short (8 characters min)' })
    @MaxLength(20, { message: 'Password is too long (20 characters max)' })
    password: string;
    company_name: string;
    PIC_fullname:string;
    PIC_phone: string;
    //({default:'active'})
    //user_type: string = 'admin';

    user_type: string;
    created_at: Date;
    
    
 }
 //const user_type: AdminManagementDTO = { user_type: 'admin' }
 export class Myquery {
    readonly user_type = 'admin';
  }