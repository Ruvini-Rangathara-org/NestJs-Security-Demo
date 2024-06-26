import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from '../common/schema/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), MemberModule ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
