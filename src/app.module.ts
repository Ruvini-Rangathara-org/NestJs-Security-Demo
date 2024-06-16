import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './in-memory-user-jwt/auth/auth.module';
import { UsersModule } from './in-memory-user-jwt/users/users.module';
import { EmployeeModule } from './security-with-db/employee/employee.module';
import { DatabaseModule } from './security-with-db/database/database.module';
import { MemberModule } from './security-with-db/member/member.module';
import { AuthDbModule } from './security-with-db/auth-db/auth-db.module';

@Module({
  imports: [AuthModule, UsersModule, EmployeeModule, DatabaseModule, MemberModule, AuthDbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
