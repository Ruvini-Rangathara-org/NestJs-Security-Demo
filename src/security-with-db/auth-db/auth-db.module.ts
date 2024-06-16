import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { MemberModule } from '../member/member.module';
import { AuthDbService } from './auth-db.service';
import { AuthDbController } from './auth-db.controller';

@Module({
  imports: [
    MemberModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '180s' },
    }),
  ],

  providers: [AuthDbService],
  controllers: [AuthDbController],
  exports: [AuthDbService],
})
export class AuthDbModule {}