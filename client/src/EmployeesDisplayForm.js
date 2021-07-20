import React from 'react';
import { useState } from "react";
import { useQuery } from 'react-query';
import * as api from './employeesApi';
import 'antd/dist/antd.css';
import { Layout, Menu, Button, Spin, Card } from 'antd';
import {
  UserOutlined, LeftOutlined, RightOutlined
} from '@ant-design/icons';
import EmployeeDetails from './EmployeeDetails';
import EmployeeNew from './EmployeeNewForm';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const EmployeesDisplayForm = () => {

  const [page, setPage] = useState(1);
  const [employeesPerPage, setemployeesPerPage] = useState(5);
  const [empId, setEmpId] = useState();
  const [collapsed, setCollapsed] = useState(false);
  const [newForm, setNewForm] = useState(false);
  const [componentHidden, setcomponentHidden] = useState(false);
  const [buttonHidden, setbuttonHidden] = useState(true);

  const { data, isLoading, isError } = useQuery(['employees',page, employeesPerPage], () =>
    api.getEmployees(page, employeesPerPage), {
    retry: false,
    keepPreviousData: true
  });
    
  if(isLoading){
    return (
      <Spin tip="Loading Employee...."/>
    );
  }

  if(isError) {
    return 'Something went wrong!';
  }
    
  const newClick = () => {
    setNewForm(true);
    setcomponentHidden(true);
  };

  const menuClick = (id) =>{
    setEmpId(id);
    setNewForm(false);
    setcomponentHidden(false);
  } 

  const handleOpenChange = () => {
    setbuttonHidden(prevState => !prevState);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onOpenChange={handleOpenChange}>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Employee" >
            {data?.map(employee =>  
              <Menu.Item key={employee.EmpId} onClick={() =>menuClick(employee.EmpId)}>
                {employee.EmpName}
              </Menu.Item>
            )}
          </SubMenu>
        </Menu>
        <button style={{ position: 'absolute',left: 5 }}
          onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))} hidden = {buttonHidden}
          disabled={page === 1}
        >
          <LeftOutlined />
        </button>
        <button style={{ position: 'absolute',right: 5 }} hidden = {buttonHidden}
          onClick={() => setPage(prevPage => (data.length < employeesPerPage) ? prevPage : prevPage + 1)}
          disabled ={data.length < employeesPerPage}
        >
          <RightOutlined />
        </button>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Button htmlType="submit" type="primary" onClick={newClick}>
            New
          </Button>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360}}>
            {!componentHidden && empId && <EmployeeDetails empId = {empId}/>}
            {newForm && <EmployeeNew />}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Employee Management System</Footer>
      </Layout>
    </Layout>
  );
}

export default EmployeesDisplayForm;