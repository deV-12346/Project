import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Modal, Form, Input, Select, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; 
import { ToastContainer, toast } from 'react-toastify';
import HeaderBar from '../Components/Header';  
import SidebarMenu from '../Components/Sidebar';
import Axiosinstance from '../../Axiosinstance';
import { baseURL } from '../../config';

const { Content } = Layout;
const { Option } = Select;

const UserManagement = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const totalAdmins = users.filter((user) => user.role === 'admin').length;
  const totalUsers = users.filter((user) => user.role === 'user').length;

    const fetchUsers = async () => {
      try {
        const response = await Axiosinstance.get(`${baseURL}/api/auth/users`);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error?.message);
        setLoading(false);
      }
    };
    useEffect(() => {
    fetchUsers();
    }, []);

  const columns = [
    { title: 'Name', dataIndex: 'username', key: 'id' },
    { title: 'Email', dataIndex: 'email', key: 'id' },
    { title: 'Mobile No', dataIndex: 'mobileno', key: 'id' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Actions',
      key: 'Actions',
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
            onClick={() => handleDelete(record._id)}
          >
            Remove
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowForm(true);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await Axiosinstance.delete(`${baseURL}/api/auth/Removeuser`, { data: { id } });
      if (response.status === 200) {
        toast.success("User removed successfully");
        setUsers(users.filter((user) => user._id !== id));
        fetchUsers();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleEditUser = async (values) => {
    try {
      const { id, username, email, mobileno, role } = values;
      const response = await Axiosinstance.put(`${baseURL}/api/auth/Edituser`, { id, username, mobileno, email, role });
      if (response.status === 200) {
        toast.success("User updated successfully");
        setIsModalVisible(false);
        fetchUsers();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleAddUser = async (values) => {
    try {
      const response = await Axiosinstance.post(`${baseURL}/api/auth/addusers`, values);
      if (response.data.success) {
        setUsers([...users, response.data]);
        setIsModalVisibleAdd(false);
        form.resetFields();
        toast.success("User successfully added");
        fetchUsers();
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SidebarMenu collapsed={collapsed} setCollapsed={setCollapsed} />

      <Layout>
        <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} title="Admin Panel"/>

        <Content style={{ padding: 24, margin: 0, minHeight: 280  }}>
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <h2 className='text-xl md:text-3xl '>Manage Users</h2>
            </Col>
            <Col xs={24} sm={12} style={{ textAlign: 'right' }}>
              <Button type="primary" onClick={() => setIsModalVisibleAdd(true)}>Add User</Button>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Col xs={24} sm={12} md={6}>
              <div style={{ background: '#f0f2f5', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                <h3>Total Admins</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalAdmins}</p>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div style={{ background: '#f0f2f5', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                <h3>Total Users</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalUsers}</p>
              </div>
            </Col>
          </Row>

          {/* Table */}
          <Table
            columns={columns}
            dataSource={users}
            loading={loading}
            rowKey="id"
            scroll={{ x: 800 }}
          />

          {/* Add User Modal */}
          <Modal
            title="Add New User"
            visible={isModalVisibleAdd && !showForm}
            onCancel={() => setIsModalVisibleAdd(false)}
            footer={null}
            width={window.innerWidth < 600 ? '90%' : '40%'}
          >
            <Form form={form} layout="vertical" onFinish={handleAddUser}>
              <Form.Item name="username" label="Username" rules={[{ required: true, min: 3, max: 15 }]}><Input /></Form.Item>
              <Form.Item name="email" label="Email" rules={[{ type: "email", required: true }]}><Input /></Form.Item>
              <Form.Item name="mobileno" label="Mobile Number" rules={[{ required: true, pattern: /^(\+91)?[6-9]\d{9}$/ }]}><Input /></Form.Item>
              <Form.Item name="password" label="Password" rules={[{ required: true, min: 6, max: 10 }]}><Input.Password /></Form.Item>
              <Form.Item name="role" label="Role" rules={[{ required: true }]}><Select><Option value="user">User</Option><Option value="admin">Admin</Option></Select></Form.Item>
              <Form.Item><Button type="primary" htmlType="submit" block>Add User</Button></Form.Item>
            </Form>
          </Modal>

          {/* Edit User Modal */}
          {showForm && (
            <Modal
              title="Edit User"
              visible={isModalVisible && showForm}
              onCancel={() => setIsModalVisible(false)}
              footer={null}
              width={window.innerWidth < 600 ? '90%' : '40%'}
            >
              <Form form={form}
               layout="vertical" 
               onFinish={handleEditUser}
               initialValues={{
                id: selectedUser?._id,
                username: selectedUser?.username,
                email: selectedUser?.email,
                mobileno: selectedUser?.mobileno,
                role: selectedUser?.role,
              }}>
                <Form.Item name="id" style={{ display: "none" }}><Input /></Form.Item>
                <Form.Item name="username" label="Username" rules={[{ required: true }]}><Input /></Form.Item>
                <Form.Item name="email" label="Email" rules={[{ type: "email", required: true }]}><Input disabled /></Form.Item>
                <Form.Item name="mobileno" label="Mobile Number" rules={[{ required: true }]}><Input /></Form.Item>
                <Form.Item name="role" label="Role" rules={[{ required: true }]}><Select><Option value="user">User</Option><Option value="admin">Admin</Option></Select></Form.Item>
                <Form.Item><Button type="primary" htmlType="submit" block>Update User</Button></Form.Item>
              </Form>
            </Modal>
          )}
        </Content>
      </Layout>

      <ToastContainer position="top-center" />
    </Layout>
  );
};

export default UserManagement;