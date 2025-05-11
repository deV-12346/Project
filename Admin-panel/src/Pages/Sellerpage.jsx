import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Modal, Form, Input, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import HeaderBar from '../Components/Header';
import SidebarMenu from '../Components/Sidebar';
import Axiosinstance from '../../Axiosinstance';
import { baseURL } from '../../config';

const { Content } = Layout;

const Seller_page = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [form] = Form.useForm();
  const [editingSeller, setEditingSeller] = useState(null);

 
  const totalSellers = sellers.length;

  
    const fetchSellers = async () => {
      try {
        const response = await Axiosinstance.get(`${baseURL}/api/auth/sellers`);
        setSellers(response.data);
      } catch (error) {
        console.error("Error fetching sellers:", error?.message);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
    fetchSellers();
  }, []);

  const handleEdit = (seller) => {
    setEditingSeller(seller);
    form.setFieldsValue(seller);
    setIsModalVisibleEdit(true);
  };

  const handleUpdateSeller = async (values) => {
    try {
      const response = await Axiosinstance.put(`${baseURL}/api/auth/Editseller`, {
        id: editingSeller._id,
        ...values,
      });
      if (response.status === 200) {
        toast.success('Seller Updated Successfully');
        setIsModalVisibleEdit(false);
        fetchSellers();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleRemove = async (id) => {
    try {
      const response = await Axiosinstance.delete(`${baseURL}/api/auth/removeseller`, { data: { id } });
      if (response.status === 200) {
        toast.success('Seller Removed Successfully');
        setSellers(sellers.filter((seller) => seller._id !== id));
        fetchSellers();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleAddSeller = async (values) => {
    try {
      const response = await Axiosinstance.post(`${baseURL}/api/auth/sellerregister`, values);
      if (response.data.success) {
        toast.success('Seller Added Successfully');
        setIsModalVisible(false);
        fetchSellers();
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const columns = [
    { title: 'Seller Name', dataIndex: 'sellername', key: 'sellername' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Mobile No', dataIndex: 'mobileno', key: 'mobileno' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleRemove(record._id)}
          >
            Remove
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SidebarMenu collapsed={collapsed} setCollapsed={setCollapsed} />

      <Layout>
        <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} title="Seller Management" />
        <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
          {/* Title and Add Button */}
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <h2 style={{ fontSize: "20px" }}>Manage Sellers</h2>
            </Col>
            <Col xs={24} sm={12} style={{ textAlign: 'right' }}>
              <Button type="primary" onClick={() => setIsModalVisible(true)}>Add Seller</Button>
            </Col>
          </Row>

         
          <Row gutter={[16, 16]} style={{ marginBottom: "20px", marginTop: "10px" }}>
            <Col xs={24} sm={12} md={6}>
              <div style={{ background: '#f0f2f5', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                <h3>Total Sellers</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalSellers}</p>
              </div>
            </Col>
          </Row>

          {/* Table */}
          <Table
            columns={columns}
            dataSource={sellers}
            loading={loading}
            rowKey="_id"
            scroll={{ x: 800 }}
          />

          {/* Add Seller Modal */}
          <Modal
            title="Add New Seller"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            width={window.innerWidth < 600 ? '90%' : '40%'}
          >
            <Form form={form} layout="vertical" onFinish={handleAddSeller}>
              <Form.Item name="sellername" rules={[{ required: true, min: 3, max: 15 }]}><Input placeholder="Seller Name" /></Form.Item>
              <Form.Item name="email" rules={[{ required: true, type: 'email' }]}><Input placeholder="Email" /></Form.Item>
              <Form.Item name="mobileno" rules={[{ required: true, pattern: /^(\+91)?[6-9]\d{9}$/, message: 'Invalid mobile number' }]}><Input placeholder="Mobile Number" /></Form.Item>
              <Form.Item name="password" rules={[{ required: true, min: 6, max: 10 }]}><Input.Password placeholder="Password" /></Form.Item>
              <Form.Item><Button type="primary" htmlType="submit" block>Add Seller</Button></Form.Item>
            </Form>
          </Modal>

          {/* Edit Seller Modal */}
          <Modal
            title="Edit Seller"
            visible={isModalVisibleEdit}
            onCancel={() => setIsModalVisibleEdit(false)}
            footer={null}
            width={window.innerWidth < 600 ? '90%' : '40%'}
          >
            <Form form={form}
             layout="vertical"
              onFinish={handleUpdateSeller}
              initialValues={{
                id: editingSeller?._id,
                username: editingSeller?.username,
                email: editingSeller?.email,
                mobileno: editingSeller?.mobileno,
                role: editingSeller?.role,
              }}>
              <Form.Item name="sellername" rules={[{ required: true, min: 3, max: 15 }]}><Input placeholder="Seller Name" /></Form.Item>
              <Form.Item name="email" rules={[{ required: true, type: 'email' }]}><Input placeholder="Email" /></Form.Item>
              <Form.Item name="mobileno" rules={[{ required: true, pattern: /^(\+91)?[6-9]\d{9}$/ }]}><Input placeholder="Mobile Number" /></Form.Item>
              <Form.Item><Button type="primary" htmlType="submit" block>Update Seller</Button></Form.Item>
            </Form>
          </Modal>

          <ToastContainer position="top-center" />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Seller_page;