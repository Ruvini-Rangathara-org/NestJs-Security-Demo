import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { MemberModule } from '../member/member.module';
import { AuthDbService } from './auth-db.service';
import { AuthDbController } from './auth-db.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../common/role-base/roles.guard';

@Module({
  imports: [
    MemberModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000s' },
    }),
  ],

  providers: [AuthDbService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AuthDbController],
  exports: [AuthDbService],
})
export class AuthDbModule {}