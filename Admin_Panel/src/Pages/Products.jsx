import React, { useState, useEffect } from 'react';
import { Layout,Modal,Input,Select, Table,Form, message,Button,Row,Col } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; 
import HeaderBar from '../Components/Header';
import SidebarMenu from '../Components/Sidebar';
import axiosinstance from "../../Axiosinstance";
import {baseURL} from "../../config";
import { toast, ToastContainer } from 'react-toastify';

const { Content } = Layout;
const { Option } = Select;
const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosinstance.get(`${baseURL}/api/product/getproducts`);
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error(error);
      message.error('Failed to fetch products');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'productName',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'productPrice',
      render: (price) => `₹${price}`,
    },
    {
      title: 'Offer Price',
      dataIndex: 'offerPrice',
      render: (offer) => offer ? `₹${offer}` : 'No Offer',
    },
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
        {
          title: 'Images',
          dataIndex: 'images',
          render: (images) => {
            if (!images || images.length === 0) return 'No Images';
        
            const maxVisible = 3;
            const visibleImages = images.slice(0, maxVisible);
            const remaining = images.length - maxVisible;
        
            return (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {visibleImages.map((img, index) => (
                  <img
                    key={index}
                    src={`${baseURL}/${img.url}`}
                    alt={`product-${index}`}
                    style={{
                      width: 50,
                      height: 50,
                      objectFit: 'cover',
                      borderRadius: 4,
                      border: '1px solid #ccc'
                    }}
                  />
                ))}
                {remaining > 0 && (
                  <span style={{
                    fontSize: 12,
                    color: '#555',
                    backgroundColor: '#f0f0f0',
                    padding: '6px 10px',
                    borderRadius: 6,
                    fontWeight: 500
                  }}>
                    +{remaining} more
                  </span>
                )}
              </div>
            );
          }
        }
  ];
  const handleDelete= async (id)=>{
    try{
      const response = await axiosinstance.delete(`${baseURL}/api/product/deleteproduct`,{data:{id}})
      if(response.data.success){
        toast.success(response.data.message)
        console.log(response.data.message)
      }
    }
    catch(error){
      toast.error(error)
      console.log(error)
    }
  }

  const handleEdit = (product)  =>{
    console.log(product)
    setSelectedProduct(product);
    setShowForm(true);
    setIsModalVisible(true);
  }
  const handleProductEdit = async (values)=>{
    try {
         const {id,productName,productDescription,productPrice,offerPrice,category} = values
         console.log(id)
         const response = await axiosinstance.put(`${baseURL}/api/product/editproduct`,{id,productName,productDescription,productPrice,offerPrice,category})
         if(response.data.success){
          console.log(response.data.message)
          toast.success(response.data.message)
         }
    }
    catch(error){
       toast.error(error.response?.data?.message)
       console.log(error.response?.data?.message)
    }

  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <ToastContainer position='top-center' />
      <SidebarMenu collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} title="Manage Products" />
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', borderRadius: '8px' }}>
          <Table
            columns={columns}
            dataSource={products}
            rowKey="_id"
            pagination={{ pageSize: 8 }}
          />
          {showForm && (
            <Modal
              title="Edit Product"
              visible={isModalVisible && showForm}
              onCancel={() => setIsModalVisible(false)}
              footer={null}
              width={window.innerWidth < 600 ? '90%' : '40%'}
            >
             <div className="py-10 px-5 md:px-20 flex flex-col justify-between bg-gray-100 rounded-2xl">
            <Form
              layout="vertical"
              onFinish={handleProductEdit}
              className="md:p-10 p-4 space-y-5 max-w-lg mx-auto"
              initialValues={{
                id: selectedProduct?._id,
                productName: selectedProduct?.productName,
                productDescription: selectedProduct?.productDescription,
                productPrice: selectedProduct?.productPrice,
                offerPrice: selectedProduct?.offerPrice,
                category: selectedProduct?.category,
              }}
              encType="multipart/form-data"
            >
            <Form.Item name="id"  style={{ display: "none" }} ><Input /></Form.Item>

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
                  Update Product
                </Button>
              </Form.Item>
            </Form>
          </div>
            </Modal>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManageProducts;