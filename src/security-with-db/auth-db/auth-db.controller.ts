import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthDbService } from './auth-db.service';

@Controller('auth-db')
export class AuthDbController {
  constructor(private authDbService: AuthDbService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authDbService.signIn(signInDto.username, signInDto.password);
  }

}