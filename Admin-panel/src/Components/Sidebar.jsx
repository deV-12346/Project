import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom'; 
import { UserOutlined, TeamOutlined, ShoppingCartOutlined, AppstoreAddOutlined, FileSearchOutlined ,CreditCardOutlined} from '@ant-design/icons';
import logo from '../logo/logo.png';

const { Sider } = Layout;

const SidebarMenu = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const currentPath = location.pathname; 

  // Mapping routes to menu keys
  const menuKeyMapping = {
    '/admindashboard': '1',
    '/admin/sellers': '2',
    '/admin/products': '3',
    '/admin/upload': '4',
    '/admin/orders': '5',
    '/admin/payments': '6',
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      trigger={null}
      width={200}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div className="logo" style={{ textAlign: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: '200px', height: '80px' }} />
      </div>
      <Menu
        mode="inline"
        selectedKeys={[menuKeyMapping[currentPath]]} // ✅ dynamic selected key
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/admindashboard">Manage Users</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<TeamOutlined />}>
          <Link to="/admin/sellers">Manage Sellers</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ShoppingCartOutlined />}>
          <Link to="/admin/products">Manage Products</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<AppstoreAddOutlined />}>
          <Link to="/admin/upload">Upload Product</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<FileSearchOutlined />}>
          <Link to="/admin/orders">Manage Orders</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<CreditCardOutlined />}>
        <Link to="/admin/payments">Manage Payments</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarMenu;