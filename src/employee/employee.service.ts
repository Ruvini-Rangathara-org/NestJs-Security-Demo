import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../common/schema/employee.entity';
import { EmployeeDto } from './dto/employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async create(employeeDto: EmployeeDto): Promise<Employee> {
    const newEmployee = this.employeeRepository.create(employeeDto);
    return await this.employeeRepository.save(newEmployee);
  }

  async update(id: string, employeeDto: EmployeeDto): Promise<Employee> {
    const employee = await this.findOne(id);
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    // Update properties
    employee.name = employeeDto.name;
    employee.mobile = employeeDto.mobile;
    employee.address = employeeDto.address;
    return await this.employeeRepository.save(employee);
  }

  async remove(id: string): Promise<string> {
    const employee = await this.findOne(id);
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    await this.employeeRepository.remove(employee);
    return "Employee removed";
  }
}
