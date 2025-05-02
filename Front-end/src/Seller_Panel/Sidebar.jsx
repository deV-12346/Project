import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { AppstoreAddOutlined, ShoppingCartOutlined, FileSearchOutlined } from '@ant-design/icons';
import logo from '../logo/logo.png';

const { Sider } = Layout;

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuKeyMapping = {
    '/sellerhome': '1',
    '/seller/products': '2',
    '/seller/orders': '3',
    '/seller/upload': '4',
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={200}
      breakpoint="lg"
      collapsedWidth="0"
      theme="light"
      trigger={null} 
    >
      <div className="logo">
        <img src={logo} alt="Logo" style={{ width: '100vh', height: '70px' }} />
      </div>
      <Menu
        mode="inline"
        selectedKeys={[menuKeyMapping[currentPath]]}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<AppstoreAddOutlined />}>
          <Link to="/sellerhome">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
          <Link to="/seller/products">Manage Products</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FileSearchOutlined />}>
          <Link to="/seller/orders">Manage Orders</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<AppstoreAddOutlined />}>
          <Link to="/seller/upload">Upload Product</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;