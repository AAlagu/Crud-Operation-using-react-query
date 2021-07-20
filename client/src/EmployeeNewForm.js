import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Result } from 'antd';
import { useMutation } from "react-query";
import * as api from './employeesApi';

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 10
  }
};

const EmployeeNew = () => {
  
  const { mutate, isSuccess } = useMutation(api.createEmployee);

  const onFinish = values => {
    const EmpId = values.emp.id;
    const EmpName = values.emp.name;
    const Email = values.emp.email;
    const Designation = values.emp.designation;
    const Salary = values.emp.salary;

    mutate({ EmpId, EmpName, Email, Designation, Salary });
  };

  if(isSuccess)
  {
    window.location.reload(); 
    return (
      <Result status="success" title="Successfully created" />
    )
  }

  return (
    <Form
      {...layout}
      name="employee-form"
      onFinish={onFinish}
    >
      <Form.Item
        name={['emp', 'id']}
        label="Employee Id"
        rules={[
          {
            required: true,
            pattern: new RegExp(
              /^[0-9]+$/
            ),
            message: "Enter valid Id"
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['emp', 'name']}
        label="Employee Name"
        rules={[
          {
            required: true,
            pattern: new RegExp(
              /^[A-Za-z]+$/
            ),
            message: "Enter valid name",
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['emp', 'email']}
        label="Email"
        rules={[
          {
            type: 'email',
            message: "Enter valid email",
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['emp', 'designation']}
        label="Designation"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['emp', 'salary']}
        label="Salary"
        rules={[
          {
            pattern: new RegExp(
              /^[0-9]+$/
            ),
            message: "Enter valid number"
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmployeeNew;
