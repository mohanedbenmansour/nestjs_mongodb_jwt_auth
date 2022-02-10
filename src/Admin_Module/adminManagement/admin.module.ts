import { Module } from '@nestjs/common';
import { UserService } from '../auth/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/user.schema';
import { AdminManagementController } from 'src/Admin_Module/adminManagement/adminManagement.controller'
import { AdminManagementService } from 'src/Admin_Module/adminManagement/adminMangement.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
   
  ],
  providers: [UserService, AdminManagementService],
  controllers: [AdminManagementController],
  exports: [UserService],

})
export class AdminModule {}