import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDTO } from 'src/user/register.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        
      ) {}


    @Post('register')
    async register(@Body() UserDTO: RegisterDTO) {
      const user = await this.userService.create(UserDTO);
      const payload = {
      
        email: user.email,
      };
  
      const token = await this.authService.signPayload(payload);
      return { user, token };
    }

}
