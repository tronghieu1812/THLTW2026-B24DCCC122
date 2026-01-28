import rules from '@/utils/rules';
import { Button, Col, Form, Input, InputNumber, Modal, Popconfirm, Row, Select, Slider, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo, useState } from 'react';
import { ProductItem } from '../types';
import InputSearch from './InputSearch';

interface ProductManagementProps {
  data: ProductItem[];
  onSave: (newData: ProductItem[]) => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

const SanPham = ({ data, onSave, searchText, setSearchText }: ProductManagementProps) => {
  const [productVisible, setProductVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<ProductItem | null>(null);
  const [productForm] = Form.useForm();

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(data.map(item => item.category)));
    return ['all', ...cats];
  }, [data]);

  const handleEditProduct = (record: ProductItem) => {
    setCurrentRow(record);
    productForm.setFieldsValue(record);
    setProductVisible(true);
  };

  const handleDeleteProduct = (record: ProductItem) => {
    const newData = data.filter((item) => item.id !== record.id);
    onSave(newData);
  };

  const handleSaveProduct = async () => {
    try {
      const values = await productForm.validateFields();
      const newData = data.map((item) =>
        item.id === currentRow?.id ? { ...item, ...values } : item
      );
      onSave(newData);
      setProductVisible(false);
      setCurrentRow(null);
      productForm.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const productColumns: ColumnsType<ProductItem> = [
    {
      title: 'STT',
      width: 70,
      align: 'center',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) => a.category.localeCompare(b.category)
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) =>
        price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
      sorter: (a, b) => a.price - b.price
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      sorter: (a, b) => a.quantity - b.quantity
    },
    {
      title: 'Trạng thái',
      dataIndex: 'quantity',
      key: 'status',
      align: 'center',
      render: (quantity: number) => {
        if (quantity > 10) return <Tag color="success">Còn hàng</Tag>;
        if (quantity > 0) return <Tag color="warning">Sắp hết hàng</Tag>;
        return <Tag color="error">Hết hàng</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      render: (_: any, record: ProductItem) => (
        <Space size="middle">
          <Button type="primary" ghost onClick={() => handleEditProduct(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa sản phẩm này không?"
            onConfirm={() => handleDeleteProduct(record)}
            okText="Có"
            cancelText="Không"
            okButtonProps={{ danger: true }}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredProducts = useMemo(() => {
    return data.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
      const matchCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchPrice = item.price >= priceRange[0] && item.price <= priceRange[1];

      let matchStatus = true;
      if (statusFilter === 'in_stock') matchStatus = item.quantity > 10;
      else if (statusFilter === 'low_stock') matchStatus = item.quantity > 0 && item.quantity <= 10;
      else if (statusFilter === 'out_of_stock') matchStatus = item.quantity === 0;

      return matchSearch && matchCategory && matchPrice && matchStatus;
    });
  }, [data, searchText, categoryFilter, priceRange, statusFilter]);

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col span={24} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>Danh sách sản phẩm</h2>
            <Button type="primary" onClick={() => {
              setCurrentRow(null);
              productForm.resetFields();
              setProductVisible(true);
            }}>
              Thêm mới
            </Button>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <div style={{ fontWeight: 'bold', marginBottom: 4 }}>Tìm tên:</div>
            <InputSearch onSearch={setSearchText} />
          </Col>

          <Col xs={24} sm={12} md={6}>
            <div style={{ fontWeight: 'bold', marginBottom: 4 }}>Danh mục:</div>
            <Select
              style={{ width: '100%' }}
              value={categoryFilter}
              onChange={setCategoryFilter}
            >
              {categories.map(cat => (
                <Select.Option key={cat} value={cat}>
                  {cat === 'all' ? 'Tất cả danh mục' : cat}
                </Select.Option>
              ))}
            </Select>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <div style={{ fontWeight: 'bold', marginBottom: 4 }}>Trạng thái:</div>
            <Select
              style={{ width: '100%' }}
              value={statusFilter}
              onChange={setStatusFilter}
            >
              <Select.Option value="all">Tất cả trạng thái</Select.Option>
              <Select.Option value="in_stock">Còn hàng ({'>'}10)</Select.Option>
              <Select.Option value="low_stock">Sắp hết hàng (1-10)</Select.Option>
              <Select.Option value="out_of_stock">Hết hàng (0)</Select.Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
              Khoảng giá: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}đ
            </div>
            <Slider
              range
              min={0}
              max={100000000}
              step={1000000}
              value={priceRange}
              onChange={(value) => setPriceRange(value as [number, number])}
            />
          </Col>
        </Row>
      </div>
      <Table
        rowKey="id"
        columns={productColumns}
        dataSource={filteredProducts}
        pagination={{ pageSize: 5, position: ['bottomCenter'] }}
        bordered
      />
      <Modal
        title={currentRow ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
        visible={productVisible}
        onOk={handleSaveProduct}
        onCancel={() => {
          setProductVisible(false);
          setCurrentRow(null);
          productForm.resetFields();
        }}
        okText="Lưu"
        cancelText="Hủy"
        destroyOnClose
      >
        <Form form={productForm} layout="vertical">
          <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Danh mục" rules={[{ required: true, message: 'Vui lòng nhập danh mục!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Vui lòng nhập giá!' }, ...rules.number(1000000000, 0)]}>
            <InputNumber style={{ width: '100%' }} addonAfter="VND" />
          </Form.Item>
          <Form.Item name="quantity" label="Số lượng tồn kho" rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }, ...rules.number(1000000, 0, false)]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SanPham;