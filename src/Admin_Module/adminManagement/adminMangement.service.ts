import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/Admin_Module/interfaces/user.interface';
import { AdminManagementDTO } from 'src/Admin_Module/adminManagement/adminManagement.dto';

@Injectable()
export class AdminManagementService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
    // fetch all users
    async getAllAdminUser(): Promise<User[]> {
        const users = await this.userModel.find({"user_type": "admin"}).exec();
        return users;
    }
    // Get a single user
    async getUser(userID): Promise<User> {
        const user = await this.userModel.findById(userID).exec();
        return user;
    }
    // post a single User
    async addUser(AdminManagementDTO: AdminManagementDTO): Promise<User> {
        const newUser = await new this.userModel(AdminManagementDTO);
        return newUser.save();
    }
    // Edit User details
    async updateUser(userID, AdminManagementDTO: AdminManagementDTO): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(userID, AdminManagementDTO, { new: true });
        return updatedUser.save();
    }
    async editUser(userID, AdminManagementDTO: AdminManagementDTO): Promise<User>{
        const editUser = await this.userModel.findByIdAndUpdate(userID, AdminManagementDTO, { new: true });       
        return editUser;
    }
    // Delete a User
    async deleteUser(userID): Promise<any> {
        const deletedUser = await this.userModel.findOneAndDelete(userID);
        return deletedUser;
    }
}