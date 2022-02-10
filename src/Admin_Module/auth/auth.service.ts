import { Injectable } from '@nestjs/common';
import { Payload } from 'src/Admin_Module/interfaces/payload.interface';
import { sign } from 'jsonwebtoken';
import { UserService } from 'src/Admin_Module/auth/user.service';
// import {ChangePasswordDTO} from 'src/Admin_Module/auth/dto/changePassword.dto'
// import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {

  constructor(private userService: UserService) {}
  
  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }
  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
//   async changePassword(userId: string, changePasswordDTO: ChangePasswordDTO): Promise<boolean> {
//     const password = await bcrypt.hash(changePasswordDTO.password,10);

//     await this.userService.updateUser(userID, { password });
//     await this.tokenService.deleteAll(userId);
//     return true;
// }
}
