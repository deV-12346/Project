import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Button, Table, Tag, Modal, Select, message, Tabs } from 'antd';
import SidebarMenu from '../Components/Sidebar';
import HeaderBar from '../Components/Header';
import axiosinstance from "../../axiosinstance";
import { baseURL } from '../../config';
import { ToastContainer, toast } from 'react-toastify';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;

const Orders = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [orders, setOrders] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await axiosinstance.get(`${baseURL}/api/order/allorders`);
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (err) {
      console.log(err?.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (selectedOrder) {
      setNewStatus(selectedOrder.status);
    }
  }, [selectedOrder]);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axiosinstance.put(`${baseURL}/api/order/updatestatus`, { orderId, status });
      if (response.data.success) {
        message.success("Order status updated");
        setVisible(false);
        fetchOrders();
        toast.success(response.data.message);
      }
    } catch (err) {
      console.log(err?.message);
    }
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'User',
      dataIndex: 'userId',
      key: 'userId',
      render: user => user?.username || "N/A",
    },
    {
      title: 'Total',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: amount => `₹${amount}`,
    },
    {
      title: 'Payment',
      dataIndex: 'payment',
      key: 'payment',
      render: payment => (
        <Tag color={payment === "COD" ? "volcano" : "green"}>{payment}</Tag>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        let color = 'orange';
        if (status === 'Delivered') color = 'green';
        else if (status === 'Cancelled') color = 'red';
        else if (status === 'Shipped') color = 'blue';
        else if (status === 'Confirmed') color = 'cyan';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: date => new Date(date).toLocaleDateString(),
    },
    {
      title: 'More',
      key: 'more',
      render: (_, record) => (
        <Button type="link" onClick={() => {
          setSelectedOrder(record);
          setVisible(true);
        }}>
          More Details
        </Button>
      )
    }
  ];

  const renderTable = (status) => (
    <Table
      columns={columns}
      dataSource={orders.filter(order => order.status === status)}
      rowKey="_id"
      bordered
      pagination={{ pageSize: 5 }}
    />
  );

  // Calculate order counts
  const statusCounts = {
    total: orders.length,
    Pending: orders.filter(order => order.status === "Pending").length,
    Confirmed: orders.filter(order => order.status === "Confirmed").length,
    Shipped: orders.filter(order => order.status === "Shipped").length,
    Delivered: orders.filter(order => order.status === "Delivered").length,
    Cancelled: orders.filter(order => order.status === "Cancelled").length,
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SidebarMenu collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} title="Manage Orders" />
        <Content style={{ padding: 24 }}>
          <Row justify="space-between" align="middle">
            <Col><h2 className='text-2xl font-semibold'>Manage Orders</h2></Col>
          </Row>

          {/* Order Status Summary */}
          <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
            <Col><Tag color="default">Total Orders: {statusCounts.total}</Tag></Col>
            <Col><Tag color="orange">Pending: {statusCounts.Pending}</Tag></Col>
            <Col><Tag color="cyan">Confirmed: {statusCounts.Confirmed}</Tag></Col>
            <Col><Tag color="blue">Shipped: {statusCounts.Shipped}</Tag></Col>
            <Col><Tag color="green">Delivered: {statusCounts.Delivered}</Tag></Col>
            <Col><Tag color="red">Cancelled: {statusCounts.Cancelled}</Tag></Col>
          </Row>

          {/* Order Status Tabs */}
          <Tabs defaultActiveKey="Pending" style={{ marginTop: 20 }}>
            <TabPane tab="Pending" key="Pending">{renderTable("Pending")}</TabPane>
            <TabPane tab="Confirmed" key="Confirmed">{renderTable("Confirmed")}</TabPane>
            <TabPane tab="Shipped" key="Shipped">{renderTable("Shipped")}</TabPane>
            <TabPane tab="Delivered" key="Delivered">{renderTable("Delivered")}</TabPane>
            <TabPane tab="Cancelled" key="Cancelled">{renderTable("Cancelled")}</TabPane>
          </Tabs>
        </Content>
      </Layout>

      {/* Order Details Modal */}
      <Modal
        title="Order Details"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        {selectedOrder && (
          <div>
            <p><strong>User:</strong> {selectedOrder?.userId?.username || "N/A"}</p>

            <h4>Shipping Address</h4>
            <p>{selectedOrder?.address?.firstName} {selectedOrder?.address?.lastName}</p>
            <p>{selectedOrder?.address?.street}, {selectedOrder?.address?.city}, {selectedOrder?.address?.state}, {selectedOrder?.address?.pincode}, {selectedOrder?.address?.country}</p>
            <p><strong>Phone:</strong> {selectedOrder?.address?.phone}</p>

            <h4>Items</h4>
            <ul>
              {selectedOrder.items.map(item => (
                <li key={item._id || item.productId?._id} style={{ marginBottom: '10px' }}>
                  <strong>Product:</strong> {item.productId?.productName || "N/A"} <br />
                  <strong>Category:</strong> {item.productId?.category || "N/A"} <br />
                  <strong>Quantity:</strong> {item.quantity} <br />
                  <strong>Price:</strong> ₹{item.price}
                </li>
              ))}
            </ul>

            <p><strong>Total:</strong> ₹{selectedOrder.totalAmount}</p>
            <p><strong>Payment:</strong> {selectedOrder.payment}</p>

            <p><strong>Status:</strong></p>
            <Select
              value={newStatus}
              onChange={(value) => setNewStatus(value)}
              style={{ width: '100%', marginBottom: 10 }}
            >
              <Option value="Pending">Pending</Option>
              <Option value="Confirmed">Confirmed</Option>
              <Option value="Shipped">Shipped</Option>
              <Option value="Delivered">Delivered</Option>
              <Option value="Cancelled">Cancelled</Option>
            </Select>

            <Button
              type="primary"
              block
              onClick={() => updateOrderStatus(selectedOrder._id, newStatus)}
              style={{ marginBottom: 20 }}
            >
              Update Status
            </Button>
          </div>
        )}
      </Modal>

      <ToastContainer position="top-center" />
    </Layout>
  );
};

export default Orders;