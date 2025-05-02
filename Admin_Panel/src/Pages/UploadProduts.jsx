import React, { useState } from 'react';
import { Layout, Form, Input, Button, Upload, Select, Typography, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import HeaderBar from '../Components/Header'; 
import SidebarMenu from '../Components/Sidebar'; 
import axiosinstance from"../../Axiosinstance"
import { baseURL } from '../../config';

const { Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

const UploadProducts = () => {
  const [fileList, setFileList] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();

    fileList.forEach((file) => {
      formData.append('files', file.originFileObj);
    });

    formData.append('productName', values.productName);
    formData.append('productDescription', values.productDescription);
    formData.append('category', values.category);
    formData.append('productPrice', values.productPrice);
    formData.append('offerPrice', values.offerPrice);

    try {
      const response = await axiosinstance.post(`${baseURL}/api/auth/uploadfile`,formData);

      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SidebarMenu collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} title="Upload Products" />
        <Content style={{ margin: '24px 16px', borderRadius:'10px', padding: 24, display:'flex', justifyContent:'center',alignItems:"center", background: '#fff' }}>
          <div className="py-10 px-5 md:px-20 flex flex-col justify-between bg-gray-100 rounded-2xl">
            <Form
              layout="vertical"
              onFinish={handleSubmit}
              className="md:p-10 p-4 space-y-5 max-w-lg mx-auto"
              encType="multipart/form-data"
            >
              <Form.Item
                label="Product Images"
                name="productImages"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                rules={[{ required: true, message: 'Please upload product images' }]}
              >
                <Upload
                  accept="image/*"
                  beforeUpload={() => false}
                  listType="picture-card"
                  onChange={handleFileChange}
                  multiple
                >
                  <div>
                    <UploadOutlined />
                    <Text>Upload Images</Text>
                  </div>
                </Upload>
              </Form.Item>

              <Form.Item
                label="Product Name"
                name="productName"
                rules={[{ required: true, message: 'Please input the product name' }]}
              >
                <Input placeholder="Type here" />
              </Form.Item>

              <Form.Item
                label="Product Description"
                name="productDescription"
              >
                <Input.TextArea placeholder="Type here" rows={4} />
              </Form.Item>

              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: 'Please select a category' }]}
              >
                <Select placeholder="Select Category">
                  {['Electronics', 'Clothing', 'Accessories'].map((item, index) => (
                    <Option key={index} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Product Price"
                    name="productPrice"
                    rules={[{ required: true, message: 'Please input the product price' }]}
                  >
                    <Input type="number" placeholder="0" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Offer Price"
                    name="offerPrice"
                    rules={[{ required: true, message: 'Please input the Offer price' }]}
                  >
                    <Input type="number" placeholder="0" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  ADD
                </Button>
              </Form.Item>
            </Form>
          </div>

          <ToastContainer position="top-center" />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UploadProducts;
