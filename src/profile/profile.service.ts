import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
// import { Profile, ProfileDocument } from './profile.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from './models/Profile';
import { Model } from 'mongoose';
// import { Injectable } from '@nestjs/common';
// import { CreateProfileDto } from './dto/create-profile.dto';


@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}
  create(createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
