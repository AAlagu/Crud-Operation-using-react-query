import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [EmployeesModule, MongooseModule.forRoot('mongodb://localhost/Employees')], //it will connect the database if Employees db is present,otherwise it will create new db as Employees
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}