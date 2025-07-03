import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './model/User';
import { CreateUserDto } from './dto/create-user.dto';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService,CreateUserDto]
})
export class UserModule {}
