import React, { useState, useEffect } from 'react';
import { Layout, Table, Button } from 'antd';
import axios from 'axios';
import { UseAppContext } from '../Context/AppContext';
import SidebarMenuSeller from './Sidebar';
import HeaderBarSeller from './Header';
import { useNavigate } from 'react-router-dom';
import axiosinstance from "../../Axiosinstance"
import { baseURL } from '../../config';
const { Content } = Layout;

const ManageSellerProducts = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = UseAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/sellerlogin');
  };
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosinstance.get(`${baseURL}/api/product/getsellerproducts`);
        console.log("used product")
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const columns = [
    { title: 'Product Name', dataIndex: 'productName', key: 'productName' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SidebarMenuSeller collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <HeaderBarSeller collapsed={collapsed} setCollapsed={setCollapsed} logout={handleLogout} user={user} />
        <Content style={{ padding: '24px', marginTop: '20px' }}>
          <h2>Manage Products</h2>
          <Table
            dataSource={products}
            columns={columns}
            loading={loading}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManageSellerProducts;
