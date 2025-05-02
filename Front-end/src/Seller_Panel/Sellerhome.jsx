import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UseAppContext } from '../Context/AppContext';
import SidebarMenuSeller from './Sidebar'; 
import HeaderBarSeller from './Header';   
import ManageOrder from './ManageOrder';
import UploadProducts from './UploadProducts';

const { Content } = Layout;

const SellerHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [productLoading, setProductLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(true);
  const { user, logout } = UseAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/sellerlogin');
    console.log("Seller Logout Successfully");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get('http://localhost:5000/api/seller/products');
        setProducts(productResponse.data);
      } catch (err) {
        console.error('Error fetching products', err);
      } finally {
        setProductLoading(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const orderResponse = await axios.get('http://localhost:5000/api/seller/orders');
        setOrders(orderResponse.data);
      } catch (err) {
        console.error('Error fetching orders', err);
      } finally {
        setOrderLoading(false);
      }
    };

    fetchProducts();
    fetchOrders();
  }, []);

  if (!user) {
    return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* ✅ Sidebar */}
      <SidebarMenuSeller collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Layout */}
      <Layout>
        {/* ✅ Header */}
        <HeaderBarSeller collapsed={collapsed} setCollapsed={setCollapsed} logout={handleLogout} user={user} />

        {/* Content */}
        <Content style={{ padding: '24px', marginTop: '30px', minHeight: 280 }}>
          {/* Top Cards */}
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card title="Your Products" bordered={false}>
                <h2>{products.length}</h2>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Your Orders" bordered={false}>
                <h2>{orders.length}</h2>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Pending Orders" bordered={false}>
                <h2>{orders.filter((order) => order.status === 'Pending').length}</h2>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SellerHome;