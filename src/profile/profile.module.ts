import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { Profile, ProfileSchema } from './models/Profile';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  exports:[ProfileService],
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
  ],
})
export class ProfileModule {}
