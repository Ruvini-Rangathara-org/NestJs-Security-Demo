import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthDbService } from './auth-db.service';
import { AuthDbGuard } from './auth-db-guard';

@Controller('auth-db')
export class AuthDbController {
  constructor(private authDbService: AuthDbService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    console.log('Sign In:', signInDto);
    return this.authDbService.signIn(signInDto.username, signInDto.password);
  }

}