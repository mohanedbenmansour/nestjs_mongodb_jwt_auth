import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/Admin_Module/interfaces/user.interface';
import { UserManagementDTO } from 'src/Admin_Module/userManagement/userManagement.dto';

@Injectable()
export class UserManagementService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
    // fetch all users
    async getAllUser(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users;
    } 
    // Get a single user
    async getUser(userID): Promise<User> {
        const user = await this.userModel.findById(userID).exec();
        return user;
    }
    // post a single User
    async addUser(userManagementDTO: UserManagementDTO): Promise<User> {
        const newUser = await new this.userModel(userManagementDTO);
        return newUser.save();
    }
    // Edit User details
    async updateUser(userID, userManagementDTO: UserManagementDTO): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(userID, userManagementDTO, { new: true });          
        return updatedUser;
    }
    async editUser(userID, userManagementDTO: UserManagementDTO): Promise<User>{
        const editUser = await this.userModel.findByIdAndUpdate(userID, userManagementDTO, { new: true });          
        return editUser;
    }
    // Delete a User
    async deleteUser(userID): Promise<any> {
        const deletedUser = await this.userModel.findOneAndDelete(userID);
        return deletedUser;
    }
}