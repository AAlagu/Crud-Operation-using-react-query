import { useQuery, useMutation } from "react-query";
import * as api from './employeesApi';
import { useState, useEffect } from "react";
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Button, Result, Popconfirm,Spin } from 'antd';

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 10
  }
};

const EmployeeDetails = ({empId }) => {
    const [form] = Form.useForm();

    const [isEditing, setIsEditing] = useState(false);
    const [isReadOnly, setIsReadonly] = useState(true);

    const { data: employee , isLoading} = useQuery(['employee', empId], () =>  
        api.getEmployeeById(empId), {
            enabled: Boolean(empId), 
            //Initialy it will try to fetch eventhough id not selected and the error happens. so to prevent this error, this will fetch only when id is selected
        }
    );

    const { mutate: updateMutate, isSuccess: updated } = useMutation(api.updateEmployee);

    const { mutate: deleteMutate, isSuccess: deleted } = useMutation(api.deleteEmployee);

    const[fields, setFields] = useState({...employee});

    useEffect(() => {
        if(employee)
        {
            form.setFieldsValue({EmpId: employee.EmpId});
            form.setFieldsValue({EmpName: employee.EmpName});
            form.setFieldsValue({Email:  employee.Email});
            form.setFieldsValue({Designation: employee.Designation});
            form.setFieldsValue({Salary: employee.Salary});
        }
    }, [employee]);

    if(!empId)
    {
        return '';
    }

    if(isLoading)
    {
        return (
            <Spin tip="Loading Employee...."/>
        );
    }    
    
    if(deleted)
    {
        window.location.reload(); 
        return (
            <Result status="success" title="Deleted" />
        )
    }

    if(updated)
    {
        window.location.reload(); 
        return (
            <Result status="success" title="Updated" />
        )
    }

    const handleChange = (event) => {
        const {name , value} = event.target;
        setFields({...fields, [name]: value });
    };

    const editClick = () => {
        setIsEditing(!isEditing);
        setIsReadonly(!isReadOnly);
    };

    function toDelete(e) {
        deleteMutate(empId);
    }

    const cancelClick = () => {
        setIsEditing(!isEditing);
        setIsReadonly(!isReadOnly);
    };

    const updateClick = () => {
        const id = employee.EmpId;
        const Designation = fields.Designation;
        const Salary = fields.Salary;
        const Email = fields.Email;
        
        updateMutate({ id, Designation, Salary, Email });
    }

    return (
        <Form
          {...layout}
          form = {form}
          name="employee-form"
        >
            <Form.Item
                name='EmpId'
                label="Employee Id"
            >
                <Input readOnly={true}/>
            </Form.Item>
            <Form.Item
                name='EmpName'
                label="Employee Name"
            >
                <Input readOnly={true}/>
            </Form.Item>
            <Form.Item
                name='Email'
                label="Email"
                rules={[
                {
                    type: 'email',
                    message: "Enter valid email",
                }
                ]}
            >
                <Input name='email' readOnly={isReadOnly} onChange={handleChange}/>
            </Form.Item>
            <Form.Item
                name='Designation'
                label="Designation"
            >
                <Input name='Designation' readOnly={isReadOnly} onChange={handleChange}/>
            </Form.Item>
            <Form.Item
                name='Salary'
                label="Salary"
            >
                <Input name='Salary' readOnly={isReadOnly} onChange={handleChange}/>
            </Form.Item>
            {!isEditing && 
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit" onClick={editClick}>
                    Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this Employee?"
                        onConfirm={toDelete}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" style={{ margin: '0 8px' }} danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </Form.Item>
            }
            {isEditing && 
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button htmlType="submit" type="primary" onClick={updateClick}>
                    Update
                    </Button>
                    <Button htmlType="button" onClick={cancelClick} style={{ margin: '0 8px' }}>
                    Cancel
                    </Button>
              </Form.Item>  
            }
        </Form>
      );
};

export default EmployeeDetails;