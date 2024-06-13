import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EmployeeModule } from './employee/employee.module';
import { DatabaseModule } from './database/database.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [AuthModule, UsersModule, EmployeeModule, DatabaseModule, MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
