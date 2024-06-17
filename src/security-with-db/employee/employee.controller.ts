import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from '../common/schema/employee.entity';
import { EmployeeDto } from './dto/employee.dto';
import { AuthDbGuard } from '../auth-db/auth-db-guard';
import { RolesGuard } from '../common/role-base/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';
import Role from '../common/constant/role.enum';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @UseGuards(AuthDbGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('getAll')
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @UseGuards(AuthDbGuard, RolesGuard)
  @Roles(Role.USER)
  @Post('get')
  async findOne(@Body('id') id: string): Promise<Employee> {
    return this.employeeService.findOne(id);
  }

  @UseGuards(AuthDbGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('create')
  async create(@Body() employeeDto: EmployeeDto): Promise<Employee> {
    return this.employeeService.create(employeeDto);
  }

  @UseGuards(AuthDbGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('update')
  async update(
    @Body('id') id: string,
    @Body() employeeDto: EmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.update(id, employeeDto);
  }

  @UseGuards(AuthDbGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('delete')
  async remove(@Body('id') id: string): Promise<string> {
    return this.employeeService.remove(id);
  }
}
