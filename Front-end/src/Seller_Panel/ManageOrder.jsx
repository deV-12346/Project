import React, { useState } from 'react';
import { Layout, Table, Button } from 'antd';
import { UseAppContext } from '../Context/AppContext';
import SidebarMenuSeller from './Sidebar';
import HeaderBarSeller from './Header';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const ManageOrders = ({ orders = [], loading = false }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = UseAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/sellerlogin');
  };

  const orderColumns = [
    { title: 'Order ID', dataIndex: 'orderId', key: 'orderId' },
    { title: 'Customer', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Actions', key: 'actions', render: (text, record) => <Button>View</Button> },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SidebarMenuSeller collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <HeaderBarSeller collapsed={collapsed} setCollapsed={setCollapsed} logout={handleLogout} user={user} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Manage Orders</h2>
          <Table
            dataSource={orders}
            columns={orderColumns}
            rowKey="orderId"
            loading={loading}
            pagination={{ pageSize: 5 }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManageOrders;
