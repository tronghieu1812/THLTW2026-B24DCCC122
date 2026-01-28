import { Button, Col, DatePicker, Descriptions, Form, Input, InputNumber, message, Modal, Row, Select, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { OrderItem, OrderProduct, ProductItem } from '../types';
import InputSearch from './InputSearch';

const { Option } = Select;
const { Text } = Typography;

interface OrderManagementProps {
  orders: OrderItem[];
  products: ProductItem[];
  onUpdateOrders: (newOrders: OrderItem[]) => void;
  onUpdateProducts: (newProducts: ProductItem[]) => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

const DonHang = ({
  orders,
  products,
  onUpdateOrders,
  onUpdateProducts,
  searchText,
  setSearchText
}: OrderManagementProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<OrderItem | null>(null);
  const [orderForm] = Form.useForm();

  // Filter states
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<[moment.Moment, moment.Moment] | null>(null);

  const selectedProductIds = Form.useWatch('productIds', orderForm);
  const allValues = Form.useWatch([], orderForm);
  const totalOrderAmount = useMemo(() => {
    if (!selectedProductIds) return 0;
    return selectedProductIds.reduce((sum: number, id: number) => {
      const product = products.find((p) => p.id === id);
      const qty = allValues?.[`quantity_${id}`] || 0;
      return sum + (product?.price || 0) * qty;
    }, 0);
  }, [selectedProductIds, allValues, products]);

  const handleCreateOrder = async () => {
    try {
      const values = await orderForm.validateFields();
      const orderProducts: OrderProduct[] = values.productIds.map((id: number) => {
        const product = products.find((p) => p.id === id);
        return {
          productId: id,
          name: product?.name || '',
          quantity: values[`quantity_${id}`],
          price: product?.price || 0,
        };
      });

      const totalAmount = orderProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

      const newOrder: OrderItem = {
        id: `ORD${Date.now().toString().slice(-6)}`,
        customerName: values.customerName,
        customerPhone: values.customerPhone,
        customerAddress: values.customerAddress,
        products: orderProducts,
        totalAmount,
        status: 'Chờ xử lý',
        stockDeducted: false,
        createdAt: new Date().toLocaleString('vi-VN'),
      };

      onUpdateOrders([newOrder, ...orders]);
      setShowModal(false);
      orderForm.resetFields();
      message.success('Tạo đơn hàng thành công');
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderItem['status']) => {
    const targetOrderIndex = orders.findIndex((o) => o.id === orderId);
    if (targetOrderIndex === -1) return;

    const targetOrder = { ...orders[targetOrderIndex] };
    let newProducts = [...products];

    // Trừ kho khi chuyển sang Hoàn thành (nếu chưa trừ)
    if (newStatus === 'Hoàn thành' && !targetOrder.stockDeducted) {
      targetOrder.products.forEach((op) => {
        newProducts = newProducts.map((p) =>
          p.id === op.productId ? { ...p, quantity: p.quantity - op.quantity } : p
        );
      });
      targetOrder.stockDeducted = true;
    }

    // Hoàn trả kho khi chuyển TỪ Hoàn thành/Đã trừ kho SANG Đã hủy
    if (newStatus === 'Đã hủy' && targetOrder.stockDeducted) {
      targetOrder.products.forEach((op) => {
        newProducts = newProducts.map((p) =>
          p.id === op.productId ? { ...p, quantity: p.quantity + op.quantity } : p
        );
      });
      targetOrder.stockDeducted = false;
    }

    const newOrders = [...orders];
    newOrders[targetOrderIndex] = { ...targetOrder, status: newStatus };

    onUpdateOrders(newOrders);
    onUpdateProducts(newProducts);
    message.success(`Cập nhật trạng thái sang "${newStatus}"`);
  };

  const orderColumns: ColumnsType<OrderItem> = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id)
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
      sorter: (a, b) => a.customerName.localeCompare(b.customerName)
    },
    {
      title: 'Số sản phẩm',
      dataIndex: 'products',
      key: 'itemCount',
      render: (products: OrderProduct[]) => products.length,
      sorter: (a, b) => a.products.length - b.products.length
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) =>
        amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
      sorter: (a, b) => a.totalAmount - b.totalAmount
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: OrderItem['status']) => {
        let color = 'gold';
        if (status === 'Đang giao') color = 'blue';
        if (status === 'Hoàn thành') color = 'green';
        if (status === 'Đã hủy') color = 'red';
        return <Tag color={color}>{status}</Tag>;
      },
      sorter: (a, b) => {
        const priority = { 'Chờ xử lý': 1, 'Đang giao': 2, 'Hoàn thành': 3, 'Đã hủy': 4 };
        return priority[a.status] - priority[b.status];
      }
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => moment(a.createdAt, 'DD/MM/YYYY, HH:mm:ss').unix() - moment(b.createdAt, 'DD/MM/YYYY, HH:mm:ss').unix()
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: OrderItem) => (
        <Space>
          <Button type="link" onClick={() => { setCurrentOrder(record); setShowDetail(true); }}>
            Xem
          </Button>
          <Select
            value={record.status}
            style={{ width: 130 }}
            onChange={(value) => handleUpdateOrderStatus(record.id, value)}
          >
            <Option value="Chờ xử lý">Chờ xử lý</Option>
            <Option value="Đang giao">Đang giao</Option>
            <Option value="Hoàn thành">Hoàn thành</Option>
            <Option value="Đã hủy">Đã hủy</Option>
          </Select>
        </Space>
      ),
    },
  ];

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchSearch =
        order.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
        order.id.toLowerCase().includes(searchText.toLowerCase());

      const matchStatus = orderStatusFilter === 'all' || order.status === orderStatusFilter;

      let matchDate = true;
      if (dateRange && dateRange[0] && dateRange[1]) {
        // order.createdAt is formatted as "vi-VN" e.g. "28/01/2026, 14:00:00"
        // We need to parse it for comparison
        const orderDate = moment(order.createdAt, 'DD/MM/YYYY, HH:mm:ss');
        matchDate = orderDate.isSameOrAfter(dateRange[0], 'day') &&
          orderDate.isSameOrBefore(dateRange[1], 'day');
      }

      return matchSearch && matchStatus && matchDate;
    });
  }, [orders, searchText, orderStatusFilter, dateRange]);

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col span={24} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>Danh sách đơn hàng</h2>
            <Button type="primary" onClick={() => setShowModal(true)}>
              Thêm mới
            </Button>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <div style={{ fontWeight: 'bold', marginBottom: 4 }}>Tìm khách hàng / Mã đơn:</div>
            <InputSearch onSearch={setSearchText} />
          </Col>

          <Col xs={24} sm={12} md={8}>
            <div style={{ fontWeight: 'bold', marginBottom: 4 }}>Trạng thái đơn hàng:</div>
            <Select
              style={{ width: '100%' }}
              value={orderStatusFilter}
              onChange={setOrderStatusFilter}
            >
              <Option value="all">Tất cả trạng thái</Option>
              <Option value="Chờ xử lý">Chờ xử lý</Option>
              <Option value="Đang giao">Đang giao</Option>
              <Option value="Hoàn thành">Hoàn thành</Option>
              <Option value="Đã hủy">Đã hủy</Option>
            </Select>
          </Col>

          <Col xs={24} sm={24} md={8}>
            <div style={{ fontWeight: 'bold', marginBottom: 4 }}>Khoảng ngày:</div>
            <DatePicker.RangePicker
              style={{ width: '100%' }}
              onChange={(dates) => setDateRange(dates as [moment.Moment, moment.Moment] | null)}
              format="DD/MM/YYYY"
            />
          </Col>
        </Row>
      </div>
      <Table
        rowKey="id"
        columns={orderColumns}
        dataSource={filteredOrders}
        pagination={{ pageSize: 5, position: ['bottomCenter'] }}
        bordered
      />

      {/* Create Order Modal */}
      <Modal
        title="Thêm đơn hàng"
        visible={showModal}
        onOk={handleCreateOrder}
        onCancel={() => {
          setShowModal(false);
          orderForm.resetFields();
        }}
        width={800}
        okText="Lưu"
        cancelText="Hủy"
        destroyOnClose
      >
        <Form form={orderForm} layout="vertical">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item name="customerName" label="Tên khách hàng" rules={[{ required: true, message: 'Nhập tên khách hàng!' }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="customerPhone"
              label="Số điện thoại"
              rules={[
                { required: true, message: 'Nhập số điện thoại!' },
                { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại phải từ 10-11 số!' },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <Form.Item name="customerAddress" label="Địa chỉ" rules={[{ required: true, message: 'Nhập địa chỉ!' }]}>
            <Input.TextArea rows={2} />
          </Form.Item>

          <Form.Item name="productIds" label="Chọn sản phẩm" rules={[{ required: true, message: 'Chọn ít nhất 1 sản phẩm!' }]}>
            <Select mode="multiple" placeholder="Chọn sản phẩm" style={{ width: '100%' }}>
              {products.map((p) => (
                <Option key={p.id} value={p.id} disabled={p.quantity === 0}>
                  {p.name} - {p.price.toLocaleString('vi-VN')}đ (Kho: {p.quantity})
                </Option>
              ))}
            </Select>
          </Form.Item>

          {selectedProductIds && selectedProductIds.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <Text strong>Số lượng đặt:</Text>
              <div style={{ marginTop: 8 }}>
                {selectedProductIds.map((id: number) => {
                  const product = products.find((p) => p.id === id);
                  return (
                    <div key={id} style={{ display: 'flex', alignItems: 'center', marginBottom: 8, gap: 16 }}>
                      <span style={{ flex: 1 }}>{product?.name}</span>
                      <Form.Item
                        name={`quantity_${id}`}
                        noStyle
                        rules={[
                          { required: true, message: 'Nhập SL!' },
                          { type: 'number', min: 1, message: 'Tối thiểu 1' },
                          {
                            validator: (_, value) => {
                              if (value > (product?.quantity || 0)) {
                                return Promise.reject(new Error(`Vượt quá tồn kho (${product?.quantity})`));
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                      >
                        <InputNumber min={1} placeholder="SL" />
                      </Form.Item>
                    </div>
                  );
                })}
              </div>
              <div style={{ textAlign: 'right', marginTop: 16 }}>
                <Text strong style={{ fontSize: 16 }}>
                  Tổng cộng: <Text type="danger">{totalOrderAmount.toLocaleString('vi-VN')} VND</Text>
                </Text>
              </div>
            </div>
          )}
        </Form>
      </Modal>

      {/* Order Detail Modal */}
      <Modal
        title={`Chi tiết đơn hàng - ${currentOrder?.id}`}
        visible={showDetail}
        onCancel={() => setShowDetail(false)}
        footer={[<Button key="close" onClick={() => setShowDetail(false)}>Đóng</Button>]}
        width={700}
      >
        {currentOrder && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Descriptions title="Thông tin khách hàng" bordered column={2}>
              <Descriptions.Item label="Tên">{currentOrder.customerName}</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">{currentOrder.customerPhone}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ" span={2}>{currentOrder.customerAddress}</Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">{currentOrder.createdAt}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color={currentOrder.status === 'Hoàn thành' ? 'green' : currentOrder.status === 'Đã hủy' ? 'red' : 'gold'}>
                  {currentOrder.status}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            <div>
              <Typography.Title level={5}>Danh sách sản phẩm</Typography.Title>
              <Table
                dataSource={currentOrder.products}
                rowKey="productId"
                pagination={false}
                columns={[
                  { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name' },
                  { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity', align: 'center' },
                  {
                    title: 'Đơn giá',
                    dataIndex: 'price',
                    key: 'price',
                    render: (p: number) => p.toLocaleString('vi-VN') + 'đ',
                  },
                  {
                    title: 'Thành tiền',
                    key: 'total',
                    align: 'right',
                    render: (_, record) => (record.price * record.quantity).toLocaleString('vi-VN') + 'đ',
                  },
                ]}
                summary={() => (
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={3} align="right">
                      <Text strong>Tổng cộng</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right">
                      <Text strong type="danger">{currentOrder.totalAmount.toLocaleString('vi-VN')}đ</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                )}
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default DonHang;