import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { UserManagementService } from 'src/Admin_Module/userManagement/userMangement.service';
import { UserManagementDTO } from 'src/Admin_Module/userManagement/userManagement.dto';

@Controller('userManagement')
export class UserManagementController {
    constructor(private userManagementService: UserManagementService) { }

    // add a customer
    @Post('/create')
    async addUser(@Res() res, @Body() userManagementDTO: UserManagementDTO) {
        const user = await this.userManagementService.addUser(userManagementDTO);
        return res.status(HttpStatus.OK).json({
            message: "User has been created successfully",
            user
        })
    }

    // Retrieve customers list
    @Get('/users')
    async getAllUser(@Res() res) {
        const users = await this.userManagementService.getAllUser();        
        return res.status(HttpStatus.OK).json(users);
    }

    // Fetch a particular customer using ID
    @Get('user/:userID')
    async getUser(@Res() res, @Param('userID') userID) {
        const user = await this.userManagementService.getUser(userID);
        if (!this.userManagementService) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }
    @Post('/editprofile')
    async editUser(@Res() res, @Query('userID') userID, @Body() userManagementDTO: UserManagementDTO) {
        const user = await this.userManagementService.updateUser(userID, userManagementDTO);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'user has been successfully updated',
            user
        });
    }
    @Put('/update')
    async updateUser(@Res() res, @Query('userID') userID, @Body() userManagementDTO: UserManagementDTO) {
        const user = await this.userManagementService.updateUser(userID, userManagementDTO);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'user has been successfully updated',
            user
        });
    }

    // Delete a customer
    @Delete('/delete')
    async deleteUser(@Res() res, @Query('userID') userID) {
        const user = await this.userManagementService.deleteUser(userID);
        if (!user) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'User has been deleted',
            user
        })
    }
}