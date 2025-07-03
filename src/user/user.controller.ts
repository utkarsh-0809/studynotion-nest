import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/common/decorator/roles';
import { JwtAuthGuard } from 'src/common/gaurds/jwtauthgaurd';
import { RolesGuard } from 'src/common/gaurds/rolesgaurd';

@Controller('/api/v1/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.userService.login(createUserDto);
  }

  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.signup(createUserDto);
  }
  @Post('/signup')
  changepassword(@Body() createUserDto: CreateUserDto) {
    return this.userService.changepassword(createUserDto);
  }
  @Post('/signup')
  sendotp(@Body() createUserDto: CreateUserDto) {
    return this.userService.sendotp(createUserDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

 
}
