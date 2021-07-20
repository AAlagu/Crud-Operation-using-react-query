import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from 'src/schemas/employee.schema';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get('/:page/:employeesPerPage')
  async findAll(@Param('page') page: number, @Param('employeesPerPage') employeesPerPage: number): Promise<Employee[]> {
    return this.employeesService.findAll(page, employeesPerPage);
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<Employee> {
    const employees = this.employeesService.findOne(id);
    return this.employeesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateEmployeeDto: UpdateEmployeeDto) : Promise<void>  {
    return await this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id') 
  async remove(@Param('id') id: number) : Promise<void> {
    return this.employeesService.remove(id);
  }
}
