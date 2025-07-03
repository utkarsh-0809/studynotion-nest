import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { OtpService } from 'src/otp/otp.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
// import * as otpGenerator from 'otp-generator';
import * as bcrypt from 'bcrypt';
import { ProfileService } from 'src/profile/profile.service';
import { JwtService } from '@nestjs/jwt';
const otpGenerator = require('otp-generator');

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
        private readonly otpService:OtpService,
        private readonly profileService:ProfileService,
        private jwtService: JwtService,
    ){}

    async sendotp(email:string){
        const checkUserPresent=await this.userService.findOne(email)
        if(checkUserPresent){
            throw new HttpException(
            {
                success: false,
                message: 'User is already registered',
            },
            HttpStatus.FOUND,
            );
        }
        
       
            const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
            });
            await this.otpService.create({email,otp});
            return {
                success: true,
                message: `OTP Sent Successfully`,
                otp,
            }
          
    }

    async signup(info:CreateUserDto){
           const {
              firstName,
              lastName,
              email,
              password,
              accountType,
              otp,
              confirmPassword,
              contactNumber
            } = info

             if (
              !firstName ||
              !lastName ||
              !email ||
              !password ||
              !confirmPassword ||
              !accountType||
              !otp
            ) {
              return {
                success: false,
                message: "All Fields are required",
              }
            }
   
            // Check if password and confirm password match
            if (password !== confirmPassword) {
              return {
                success: false,
                message:
                  "Password and Confirm Password do not match. Please try again.",
              }
            }
        
            // Check if user already exists
            const existingUser = await this.userService.findOne(email)
            if (existingUser) {
              return {
                success: false,
                message: "User already exists. Please sign in to continue.",
              }
            }
        
             // Find the most recent OTP for the email
            const response = await this.otpService.findOne( email ).sort({ createdAt: -1 }).limit(1)
            console.log(response)
            if (response.length === 0) {
              // OTP not found for the email
              return {
                success: false,
                message: "The OTP is not valid",
              }
            } else if (otp !== response[0].otp ){
              // Invalid OTP
              return {
                success: false,
                message: "The OTP is not valid",
              }
            }
        
    
            const hashedPassword = await bcrypt.hash(password, 10)
            console.log(hashedPassword);
            // Create the user
            let approved:any = accountType;
            approved === "Instructor" ? (approved = false) : (approved = true)
        
            // Create the Additional Profile For User
            const profileDetails:any = await this.profileService.create({
              gender: null,
              dateOfBirth: null,
              about: null,
              contactNumber: null,
            })

            const user = await this.userService.create({
              firstName,
              lastName,
              email,
              contactNumber,
              password: hashedPassword,
              accountType,
              approved,
              additionalDetails: profileDetails.id,
              image: "",
            })
        
            
            return{
              success: true,
              user,
              message: "User registered successfully",
            }
    
}
     async validateUser(email: string, password: string): Promise<any> {
    const user:any = await this.userService.findOne(email);
    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid password');

    // remove sensitive fields
    const { password: _, ...result } = user.toObject();
    return result;
  }

  async login(user: any) {
    const payload = { sub: user._id, email: user.email, role: user.role };
    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }

  
  async updatePassword(user:any){
    return "";
  }

}

