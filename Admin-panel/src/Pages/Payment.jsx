import React, { useEffect, useState } from 'react';
import { Layout, Table, Tag, Button, message, Row, Col } from 'antd';
import axiosinstance from '../../axiosinstance';
import { baseURL } from '../../config';
import SidebarMenu from '../Components/Sidebar';
import HeaderBar from '../Components/Header';

const { Content } = Layout;

const Payment = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchPayments = async () => {
    try {
      const response = await axiosinstance.get(`${baseURL}/api/payment/allpayments`);
      if (response.data.success) {
        setOrders(response.data.payments);
      }
    } catch (err) {
      console.error(err?.message);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleRefund = async (payment_id) => {
    try {
      const response = await axiosinstance.put(`${baseURL}/api/payment/refund/${payment_id}`);
      if (response.data.success) {
        message.success(response.data.message);
        fetchPayments();
      }
    } catch (err) {
      message.error('Refund failed');
      console.error(err?.message);
    }
  };

  const paidPayments = orders.filter(order => order.payment_id?.status === 'Paid');
  const refundedPayments = orders.filter(order => order.payment_id?.status === 'Refund');

  const paidTotal = paidPayments.reduce((sum, order) => sum + (order.payment_id?.amount || 0), 0);
  const refundTotal = refundedPayments.reduce((sum, order) => sum + (order.payment_id?.amount || 0), 0);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'items',
      key: 'username',
      render: items => (items?.length ? items[0].username : 'N/A'),
    },
    {
      title: 'Mobile',
      key: 'mobileno',
      render: record => record.userId?.mobileno || 'N/A',
    },
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Amount',
      dataIndex: ['payment_id', 'amount'],
      key: 'amount',
      render: amount => `₹${amount || 0}`,
    },
    {
      title: 'Payment ID',
      dataIndex: ['payment_id', 'razorpay_payment_id'],
      key: 'razorpay_payment_id',
    },
    {
      title: 'Products',
      dataIndex: 'items',
      key: 'products',
      render: items =>
        items?.length ? (
          <ul style={{ paddingLeft: 4 }}>
            {items.map(item => (
              <li key={item._id}>
                {item.productName} (Qty: {item.quantity})
              </li>
            ))}
          </ul>
        ) : (
          'No products'
        ),
    },
    {
      title: 'Status',
      dataIndex: ['payment_id', 'status'],
      key: 'status',
      render: status => (
        <Tag color={status === 'Refund' ? 'red' : 'green'}>{status}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) =>
        record.payment_id?.status !== 'Refund' ? (
          <Button danger onClick={() => handleRefund(record.payment_id._id)}>
            Refund
          </Button>
        ) : (
          <Tag color="default">Refunded</Tag>
        ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SidebarMenu collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} title="Manage Payments" />
        <Content style={{ padding: 24 }}>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Paid Payments</h2>

          <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
            <Col xs={24} sm={12} md={6}>
              <div style={{ background: '#f0f2f5', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                <h3>Total Paid Payments</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{paidPayments.length}</p>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div style={{ background: '#f6ffed', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                <h3>Total Amount</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>₹{paidTotal}</p>
              </div>
            </Col>
          </Row>

          <Table
            dataSource={paidPayments}
            columns={columns}
            rowKey="_id"
            pagination={{ pageSize: 6 }}
            bordered
            scroll={{ x: true }}
          />

          <h2 className="text-xl sm:text-2xl font-semibold mt-10 mb-4">Refunded Payments</h2>

          <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
            <Col xs={24} sm={12} md={6}>
              <div style={{ background: '#fff1f0', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                <h3>Total Refunded Payments</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff4d4f' }}>{refundedPayments.length}</p>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div style={{ background: '#fff1f0', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
                <h3>Total Refund Amount</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff4d4f' }}>₹{refundTotal}</p>
              </div>
            </Col>
          </Row>

          <Table
            dataSource={refundedPayments}
            columns={columns.filter(col => col.key !== 'action')}
            rowKey="_id"
            pagination={{ pageSize: 6 }}
            bordered
            scroll={{ x: true }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Payment;