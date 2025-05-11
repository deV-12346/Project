import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Tag, Row, Col, Modal, Form, Input } from 'antd';
import { UseAppContext } from '../Context/AppContext';
import SidebarMenuSeller from './Sidebar';
import HeaderBarSeller from './Header';
import { useNavigate } from 'react-router-dom';
import axiosinstance from "../../Axiosinstance";
import { baseURL } from '../../config';
import { ToastContainer ,  toast } from 'react-toastify';


const { Content } = Layout;

const ManageSellerProducts = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = UseAppContext();
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form] = Form.useForm();

  const handleLogout = () => {
    logout();
    navigate('/sellerlogin');
  };

    const fetchProducts = async () => {
      try {
        const response = await axiosinstance.get(`${baseURL}/api/product/getsellerproducts`);
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns = [
    { title: 'Product Name', dataIndex: 'productName', key: 'productName' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      // render: (status) => (
      //   <Tag color={status === 'Placed' ? 'green' : 'orange'}>
      //     {status === 'Placed' ? 'Placed' : 'Pending'}
      //   </Tag>
      // ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button  onClick={() => handleEdit(record)} style={{ marginRight: '8px' }}>
            Edit
          </Button>
          <Button  onClick={()=>handledelete(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
    {
              title: 'Images',
              dataIndex: 'images',
              render: (images) => {
                if (!images || images.length === 0) return 'No Images';
            
                const maxVisible = 1;
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
  const handleEdit = (record) => {
    setSelectedProduct(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleUpdate = async (values) => {
    try {
      const response = await axiosinstance.put(`${baseURL}/api/product/editusedproduct`,{id:selectedProduct._id ,...values});
      if (response.data.success) {
        setIsModalVisible(false);
        toast.success(response.data.message)
        console.log(response.data.message)
        fetchProducts();
      }
    } catch (err) {
      toast.error(err.response?.data?.message)
    }
  };
  const handledelete = async (id)=>{
    console.log(id)
    try {
      const response = await axiosinstance.delete(`${baseURL}/api/product/deleteusedproduct`,{data:{id}})
      if(response.data.success){
        toast.success(response.data.message)
        console.log(response.data.message)
        fetchProducts();
      }
    } catch (error) {
      console.log(error.response?.data?.message)
      toast.error(error.response?.data?.message)
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <ToastContainer position='top-center'/>
      <SidebarMenuSeller collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <HeaderBarSeller collapsed={collapsed} setCollapsed={setCollapsed} logout={handleLogout} user={user} />
        <Content style={{ padding: '24px', marginTop: '20px' }}>
          <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
            <Col xs={24} sm={12} md={6}>
              <div style={{ background: '#f0f2f5', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                <h3>Total Products</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{products.length}</p>
              </div>
            </Col>
          </Row>
          <Table
            dataSource={products}
            columns={columns}
            loading={loading}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />

          <Modal
            title="Edit Product"
            open={isModalVisible}
            onOk={() => form.submit()}
            onCancel={() => setIsModalVisible(false)}
            okText="Update"
          >
            <Form form={form} layout="vertical" onFinish={handleUpdate}  initialValues={selectedProduct} >
              <Form.Item name="productName" label="Product Name" rules={[{ required: true ,min:5 }]}>
                <Input />
              </Form.Item>
              <Form.Item name="productDescription" label="Description" rules={[{ required: true, min:30 }]}>
                <Input />
              </Form.Item>
              <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                <Input type="number" />
              </Form.Item>
              <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="address" label="Address" rules={[{ required: true , min:20 }]}>
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManageSellerProducts;