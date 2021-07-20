import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

//It creates collection as Employee 
@Schema()
export class Employee {

  @Prop()
  EmpId: number;
  
  @Prop()
  EmpName: string;

  @Prop()
  Email: string;

  @Prop()
  Designation: string;

  @Prop()
  Salary: number;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
