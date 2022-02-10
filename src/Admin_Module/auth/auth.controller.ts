import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Res,
  HttpStatus,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { RegisterDTO } from 'src/Admin_Module/auth/dto/register.dto';
import { UserService } from 'src/Admin_Module/auth/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import {ChangePasswordDTO} from 'src/Admin_Module/auth/dto/changePassword.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/onlyauth')
  @UseGuards(AuthGuard('jwt'))
  async hiddenInformation() {
    return 'hidden information';
  }
  @Get('/anyone')
  async publicInformation() {
    return 'this can be seen by anyone';
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() registerDTO: RegisterDTO) {
    const user = await this.userService.create(registerDTO);
    const payload = {
      email: user.email,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.userService.findByLogin(loginDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
  @Post('logout')
  async logout(){
    return {message:'Logout Successfully'}
  }
  @Put('/changepassword')
    async changepassword(@Res() res, @Query('userID') userID, @Body() changePasswordDTO: ChangePasswordDTO) {
        const user = await this.userService.changePassword(userID, changePasswordDTO);
        return res.status(HttpStatus.OK).json({
            message: 'password change successfully ',
            user
        });
    }
}
