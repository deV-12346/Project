import React, { useState } from 'react';
import { Layout, Row, Col, Button } from 'antd';
import SidebarMenu from '../Components/Sidebar'; 
import HeaderBar from '../Components/Header';  
import { ToastContainer } from 'react-toastify';

const { Content } = Layout;

const Orders = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SidebarMenu collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} title="Manage Orders" />
        <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
  
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <h2 className='text-xl md:text-3xl'>Manage Orders</h2>
            </Col>
            <Col xs={24} sm={12} style={{ textAlign: 'right' }}>
              <Button type="primary">Add Order</Button> {/* optional: you can remove this if no Add */}
            </Col>
          </Row>

         
          <div style={{ marginTop: "20px" }}>
            <h3>Orders Table / Manage Orders functionality will come here</h3>
          </div>
        </Content>
      </Layout>

      <ToastContainer position="top-center" />
    </Layout>
  );
};

export default Orders;
