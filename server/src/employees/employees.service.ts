import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from 'src/schemas/employee.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) {}
  
  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return await new this.employeeModel(createEmployeeDto).save();
  }

  async findAll(page: number, employeesPerPage: number): Promise<Employee[]>{
    const skippedDocs = (page - 1) * employeesPerPage;
    const show = Number(employeesPerPage);

    return await this.employeeModel.find().sort( { EmpName: 1 } ).skip(skippedDocs).limit(show);
  }

  async findOne(EmpId: number): Promise<Employee> {
    return await this.employeeModel.findOne({EmpId});
  }

  async update(EmpId: number, updateEmployeeDto: UpdateEmployeeDto): Promise<void> {
    await this.employeeModel.updateMany({EmpId}, {$set: {...updateEmployeeDto}} );
  }

  async remove(EmpId: number): Promise<void> {
    await this.employeeModel.deleteOne({EmpId});
  }
}