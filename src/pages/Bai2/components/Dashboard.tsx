import { BoxPlotOutlined, DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Card, Col, Progress, Row, Space, Statistic, Typography } from 'antd';
import { useMemo } from 'react';
import { OrderItem, ProductItem } from '../types';

const { Title, Text } = Typography;

interface DashboardProps {
  products: ProductItem[];
  orders: OrderItem[];
}

const Dashboard = ({ products, orders }: DashboardProps) => {
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalStockValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const totalOrders = orders.length;
    const totalRevenue = orders
      .filter(o => o.status === 'Hoàn thành')
      .reduce((sum, o) => sum + o.totalAmount, 0);

    const statusCounts = orders.reduce((acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { totalProducts, totalStockValue, totalOrders, totalRevenue, statusCounts };
  }, [products, orders]);

  const statusConfig = [
    { label: 'Chờ xử lý', color: 'gold', status: 'Chờ xử lý' },
    { label: 'Đang giao', color: 'blue', status: 'Đang giao' },
    { label: 'Hoàn thành', color: 'green', status: 'Hoàn thành' },
    { label: 'Đã hủy', color: 'red', status: 'Đã hủy' },
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} style={{ height: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Statistic
              title="Tổng số sản phẩm"
              value={stats.totalProducts}
              prefix={<BoxPlotOutlined style={{ color: '#1890ff' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} style={{ height: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Statistic
              title="Giá trị tồn kho"
              value={stats.totalStockValue}
              suffix="đ"
              prefix={<DollarCircleOutlined style={{ color: '#52c41a' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} style={{ height: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Statistic
              title="Tổng đơn hàng"
              value={stats.totalOrders}
              prefix={<ShoppingCartOutlined style={{ color: '#faad14' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} style={{ height: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Statistic
              title="Doanh thu (Đã xong)"
              value={stats.totalRevenue}
              suffix="đ"
              prefix={<ShoppingOutlined style={{ color: '#f5222d' }} />}
            />
          </Card>
        </Col>
      </Row>

      <Card bordered={false} style={{ marginTop: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <Title level={5} style={{ marginBottom: 20 }}>Tỷ lệ trạng thái đơn hàng</Title>
        <Row gutter={32} align="middle">
          <Col xs={24} md={stats.totalOrders > 0 ? 16 : 24}>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              {statusConfig.map(cfg => {
                const count = stats.statusCounts[cfg.status] || 0;
                const percent = stats.totalOrders > 0 ? Math.round((count / stats.totalOrders) * 100) : 0;
                return (
                  <div key={cfg.status}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <Text strong>{cfg.label}</Text>
                      <Text>{count} đơn ({percent}%)</Text>
                    </div>
                    <Progress percent={percent} strokeColor={cfg.color} showInfo={false} size="small" />
                  </div>
                );
              })}
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Dashboard;