import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from '../common/schema/employee.entity';
import { EmployeeDto } from './dto/employee.dto';
import { AuthGuard } from '../../in-memory-user-jwt/auth/auth.guard';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('getAll')
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Post('get')
  async findOne(@Body('id') id: string): Promise<Employee> {
    return this.employeeService.findOne(id);
  }

  @Post('create')
  async create(@Body() employeeDto: EmployeeDto): Promise<Employee> {
    return this.employeeService.create(employeeDto);
  }

  @Post('update')
  async update(
    @Body('id') id: string,
    @Body() employeeDto: EmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.update(id, employeeDto);
  }

  @Post('delete')
  async remove(@Body('id') id: string): Promise<string> {
    return this.employeeService.remove(id);
  }
}
