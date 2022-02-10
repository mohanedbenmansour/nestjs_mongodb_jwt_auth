import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { AdminManagementService } from 'src/Admin_Module/adminManagement/adminMangement.service';
import { AdminManagementDTO } from 'src/Admin_Module/adminManagement/adminManagement.dto';

@Controller('adminManagement')
export class AdminManagementController {
    constructor(private adminManagementService: AdminManagementService) { }

    // add a customer
    @Post('/admin_create')
    async addUser(@Res() res, @Body() AdminManagementDTO: AdminManagementDTO) {
        const user = await this.adminManagementService.addUser(AdminManagementDTO);
        return res.status(HttpStatus.OK).json({
            message: "User has been created successfully",
            user
        })
    }

    // Retrieve customers list
    @Get('/admin_list')
    async getAllUser(@Res() res) {
        const users = await this.adminManagementService.getAllAdminUser();
        
        return res.status(HttpStatus.OK).json(users);
    }

    // Fetch a particular customer using ID
    @Get('admin/:userID')
    async getUser(@Res() res, @Param('userID') userID) {
        const user = await this.adminManagementService.getUser(userID);
        if (!this.adminManagementService) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }
    @Post('/admin_editprofile')
    async editUser(@Res() res, @Query('userID') userID, @Body() AdminManagementDTO: AdminManagementDTO) {
        const user = await this.adminManagementService.editUser(userID, AdminManagementDTO);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'user has been successfully updated',
            user
        });
    }
    @Put('/admin_update')
    async updateUser(@Res() res, @Query('userID') userID, @Body() AdminManagementDTO: AdminManagementDTO) {
        const user = await this.adminManagementService.updateUser(userID, AdminManagementDTO);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'user has been successfully updated',
            user
        });
    }

    // Delete a customer
    @Delete('/admin_delete')
    async deleteUser(@Res() res, @Query('userID') userID) {
        const user = await this.adminManagementService.deleteUser(userID);
        if (!user) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'User has been deleted',
            user
        })
    }
}