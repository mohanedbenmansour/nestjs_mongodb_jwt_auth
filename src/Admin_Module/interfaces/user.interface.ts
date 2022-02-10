import { Document } from 'mongoose';

export interface User extends Document {
   first_name:string;
   last_name:string;
   email: string;
   password: string;
   company_name: string;
   PIC_fullname:string;
   PIC_phone: string;
   user_type:string;
   created_at: Date;

}