import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/gaurds/rolesgaurd';
import { JwtAuthGuard } from 'src/common/gaurds/jwtauthgaurd';
import { Roles } from 'src/common/decorator/roles';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sendotp')
  async sendotp(@Body('email') email:string){
    return this.sendotp(email)
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

   @UseGuards(JwtAuthGuard)
  updatePassword(@Req() req:any){
    return this.authService.updatePassword(req.user)
  }

}
