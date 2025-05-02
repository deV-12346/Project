import React from 'react';
import { Layout, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const HeaderBar = ({ collapsed, setCollapsed, title = "Admin Panel" }) => { 
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Header
      className="site-layout-background"
      style={{ padding:"40px 20px",margin:"0px 20px",  borderRadius :"10px", display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#001529' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {/* Collapse Icon */}
        {collapsed ? (
          <MenuUnfoldOutlined
            onClick={() => setCollapsed(false)}
            style={{ fontSize: '24px', color: 'white', cursor: 'pointer' }}
          />
        ) : (
          <MenuFoldOutlined
            onClick={() => setCollapsed(true)}
            style={{ fontSize: '24px', color: 'white', cursor: 'pointer' }}
          />
        )}
        <div style={{ fontSize: '20px', color: 'white' }}>{title}</div>
      </div>
      <Button type="primary" onClick={handleLogout} style={{ padding: "22px 22px", fontSize: "20px" }}>
        Logout
      </Button>
    </Header>
  );
};

export default HeaderBar;