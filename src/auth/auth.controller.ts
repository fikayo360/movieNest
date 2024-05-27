
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Request, Response, HttpCode,HttpStatus, UseGuards,Req,Param} from '@nestjs/common';
import {signInDto,signUpDto,forgotPasswordDto,changePasswordDto,refreshToken} from './dto/index'
import {JwtAuthGuard} from '../shared/guards/index'
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto:signUpDto){
    return this.authService.signup(dto)
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto:signInDto){
    return this.authService.signin(dto)
  }

  @Post('forgot')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() dto:forgotPasswordDto){
    return this.authService.forgotPassword(dto)
  }

  @Post('change')
  @HttpCode(HttpStatus.OK)
  changePassword(@Body() dto:changePasswordDto){
    return this.authService.changePassword(dto)
  }
  
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Body() dto:refreshToken, @Req() req):Promise<Tokens> {
    return this.authService.refreshTokens(dto,req)
  }


  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  logout( @Req() req){
    return this.authService.logout(req)
  }

}
