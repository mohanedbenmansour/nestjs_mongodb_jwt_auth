import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { RegisterDTO } from 'src/user/register.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
        
      ) {}


      @Get("/onlyauth")
      @UseGuards(AuthGuard("jwt"))
  async hiddenInformation(){
    return  "hidden information";
  }
  @Get("/anyone")
async publicInformation(){
return  "this can be seen by anyone";
}

    @Post('register')
    async register(@Body() UserDTO: RegisterDTO) {
      const user = await this.userService.create(UserDTO);
      const payload = {
      
        email: user.email,
      };
  
      const token = await this.authService.signPayload(payload);
      return { user, token };
    }
    @Post('login')
    async login(@Body() UserDTO: LoginDTO) {
      const user = await this.userService.findByLogin(UserDTO);
      const payload = {
        email: user.email,
      };
      const token = await this.authService.signPayload(payload);
      return { user, token};
    }


    
}
