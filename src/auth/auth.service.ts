import { Injectable,Logger } from '@nestjs/common';
import {signInDto,signUpDto,forgotPasswordDto,changePasswordDto,refreshToken} from'./dto/index'
import { BadRequestException,ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import {JwtPayload,Tokens} from './types/index'
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { MailerService } from '@nestjs-modules/mailer';
import { authDB } from './auth.respository';

@Injectable()
export class AuthService {
    constructor(private jwtService:JwtService, private mailService:MailerService,private db:authDB){}

    public async signin(dto:signInDto){
        const {username,password} = dto
        const user = await this.db.findUsername(username)
          if (!user){
            //  this.logger.error('access denied not a user')
             throw new ForbiddenException('user not found')
            }
          const passwordMatches = await this.comparePasswords(user.password, password);
          if (!passwordMatches){
            // this.logger.error('wrong password')
            throw new ForbiddenException('Access Denied wrong password');
          }
          const tokens = await this.getTokens(user.id,user.email)
          await this.updateRtHash(user.id, tokens.refresh_token);
          return tokens
    }

    public async signup(dto:signUpDto){
        const {username,password,email} = dto
        const userExists = await this.db.findUsername(username)
          if (userExists) {
            // this.logger.error('user already exists')
            throw new BadRequestException('user already exists');
          }

          const emailExists = await this.db.findEmail(email)
      
          if (emailExists) {
            // this.logger.error('user already exists')
            throw new BadRequestException('emailaddress already exists');
          }
      
          const hashedPassword = await this.hashPassword(password);
          const defaultRole = 'user'
          const user = {email,username,password:hashedPassword,role:defaultRole}
          const tokens = await this.db.createUser(user)
          return tokens ;
    }

    public async forgotPassword(dto:forgotPasswordDto){
        const {email} = dto
        const resetToken = this.sendToken(email)
        await this.db.updateUserResetToken(email,resetToken)
        // this.logger.log(`otp sent sent to ${email}`)
        return 'otp sent succesfully' 
    }

    public async changePassword(dto:changePasswordDto){
        const {token,newPassword,email} = dto
        const user = await this.db.findEmail(email)
        if (!user) throw new ForbiddenException('Access Denied');
        if(user.resettoken === token){
          const hashToken = bcrypt.hashSync(newPassword,8)
          await this.db.updateHashToken(user.id,hashToken)
          // this.logger.log('password reset succesfully')
          return 'password reset succesfully'
        }else{
          // this.logger.log('access denied')
          return "access denied"
        }
    }

    async logout(req:any): Promise<boolean> {
      const userId = req.user.sub
      console.log(userId);
      await this.db.updateRefreshToNull(userId)
      return true;
    }
  

    async hashPassword(password: string) {
        const saltOrRounds = 10;
        return await bcrypt.hashSync(password, saltOrRounds);
      }
    
      async comparePasswords(hash: string, password: string ) {
        return await bcrypt.compare(password, hash);
      }

      async updateRtHash(userId: string, rt: string): Promise<void> {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(rt, saltOrRounds);
        await this.db.updateRefreshTokenHash(userId,hash)
      }
      
      async refreshTokens(dto:refreshToken,req:any): Promise<Tokens> {
        const {email,rt} = dto
        const user = await this.db.findEmail(email)
        if (!user || !user.hashedRt){ 
          // this.logger.error(`access denied for ${user.email} refresh token`)
          throw new ForbiddenException('Access Denied no user found')
        }
        const rtMatches = await bcrypt.compare(rt,user.hashedRt);
        console.log(rtMatches);
        if (!rtMatches){ 
          // this.logger.error('access denied refresh tokens dont match ')
          throw new ForbiddenException('Access Denied token does not match')
        }
        const tokens = await this.getTokens(user.id, user.email);
        await this.db.updateRefreshTokenHash(user.id, tokens.refresh_token);
        return tokens;
      }

      async getTokens(userId: string, email: string): Promise<Tokens> {
        const defaultRole = 'user'
        const jwtPayload: JwtPayload = {
          sub: userId,
          email: email,
          role: defaultRole
        };
    
        const [at, rt] = await Promise.all([
          this.jwtService.signAsync(jwtPayload, {
            secret: 'AT_SECRET',
            expiresIn: '1d',
          }),
          this.jwtService.signAsync(jwtPayload, {
            secret:'RT_SECRET',
            expiresIn: '7d',
          }),
        ]);
    
        return {
          access_token: at,
          refresh_token: rt,
        };
      }

      public generateOtp():string{
        
        const length = 6;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let OTP = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          OTP += characters.charAt(randomIndex);
        }
      
        return OTP;
      }

      public sendToken(email:string):string {
        let tokenData = this.generateOtp()
    
        this.mailService.sendMail({
          from: process.env.Email,
          to: email,
          subject: `forgot password`,
          text: `we sent an otp use it to reset your password: ${tokenData}`
        });
        console.log(tokenData)
        return tokenData
      }
}
