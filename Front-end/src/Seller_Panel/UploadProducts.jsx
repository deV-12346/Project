import React, { useState } from 'react';
import { Layout, Form, Input, Button, Upload, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UseAppContext } from '../Context/AppContext';
import SidebarMenuSeller from './Sidebar';
import HeaderBarSeller from './Header';
import { ToastContainer, toast } from 'react-toastify';

const { Content } = Layout;
const { Option } = Select;

const UploadProducts = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [fileList, setFileList] = useState([]);
  const { user, logout } = UseAppContext();
  const [form] = Form.useForm()
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/sellerlogin');
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = async (values) => {
    const { id, productName, productDescription, price, category, address } = values;

    if (fileList.length === 0) {
      message.error('Please upload a product image!');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('productName', productName);
      formData.append('productDescription', productDescription);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('address', address);

      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append('files', file.originFileObj);
        }
      });

      const response = await axios.post('http://localhost:5000/api/product/usedproduct', formData);

      if (response.data.success) {
        message.success('Product uploaded successfully');
        toast.success(response.data.message)
        form.resetFields()
        setFileList([]);
      }
    } catch (err) {
      toast.error(err.response.data.message)
      console.error('Error uploading product:', err);
      message.error('Error uploading product');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
       <ToastContainer position='top-center' />
      <SidebarMenuSeller collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <HeaderBarSeller collapsed={collapsed} setCollapsed={setCollapsed} logout={handleLogout} user={user} />
        {user ?( <Content style={{ padding: '24px', marginTop: '30px', minHeight: 280 }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px' }}>Upload Product</h2>
            <Form onFinish={handleSubmit} form={form} layout="vertical">
            <Form.Item name="id" initialValue={user.id} style={{display:"none"}} >
              <Input  />
             </Form.Item>

              <Form.Item label="Product Name" name="productName" rules={[{ required: true,min:5 }]}>
                <Input />
              </Form.Item>

              <Form.Item label="Product Description" name="productDescription" rules={[{ required: true, min:30 , message: 'Please input the product description! of atleast 20 words' }]}>
                <Input.TextArea rows={4} />
              </Form.Item>

              <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input the product price!' }]}>
                <Input type="number" />
              </Form.Item>

              <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select the product category!' }]}>
                <Select placeholder="Select Category">
                  <Option value="mobile">Mobile</Option>
                  <Option value="laptop">Laptop</Option>
                  <Option value="car">Car</Option>
                  <Option value="bike">Bike</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Address" name="address" rules={[{ required: true,min:20}]}>
                <Input type="text" />
              </Form.Item>

              <Form.Item
                label="Product Images"
                name="files"
                valuePropName="fileList"
                getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                rules={[{ required: true, message: 'Please upload at least one product image!' }]}
              >
                <Upload
                  name="files"
                  listType="picture"
                  multiple
                  beforeUpload={() => false}
                  onChange={handleFileChange}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Upload Product
                </Button>
              </Form.Item>
             
            </Form>
          </div>
        </Content> ) : " " }
      </Layout>
    </Layout>
  );
};

export default UploadProducts;