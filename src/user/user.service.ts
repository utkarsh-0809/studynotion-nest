import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './model/User';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel:Model<UserDocument>){}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  login(createUserDto:CreateUserDto){
    return 'you are logged in'
  }

  signup(createUserDto:CreateUserDto){
    return 'you are signedup in'
  }
  changepassword(createUserDto:CreateUserDto){
    return 'password changed'
  }
  sendotp(createUserDto:CreateUserDto){
    return 'otp sent'
  }
  resetPasswordToken(createUserDto:CreateUserDto){
    return 'otp sent'
  }
  resetPassword(createUserDto:CreateUserDto){
    return 'otp sent'
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
