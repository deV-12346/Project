import React from 'react';
import { Layout, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const HeaderBarSeller = ({ collapsed, setCollapsed, logout, user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/sellerlogin');
  };

  return (
    <Header
      style={{
        margin:"0px 20px",
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#001529',
        height: '64px',
        borderRadius:"10px"
      }}
    >
      {/* Left side: Toggle + Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <MenuOutlined
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '24px',
            color: '#fff',
            cursor: 'pointer',
          }}
        />
        <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
          Seller Dashboard
        </span>
      </div>

        <Button
          type="primary"
          onClick={handleLogout}
          style={{ fontSize: '16px', padding: '5px 15px' }}
        >
          Logout
        </Button>
    </Header>
  );
};

export default HeaderBarSeller;