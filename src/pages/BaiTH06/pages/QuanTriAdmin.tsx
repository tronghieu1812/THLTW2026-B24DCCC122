import React, { useState } from 'react';
import { 
  Table, Button, Space, Modal, Form, Input, InputNumber, 
  Rate, Upload, message, Typography, Row, Col, Card, Statistic 
} from 'antd';
import { 
  PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined, 
  LineChartOutlined, EnvironmentOutlined, DollarCircleOutlined 
} from '@ant-design/icons';
import { DiemDen } from '../types/DuLich';

const { Title, Text } = Typography;

const QuanTriAdmin: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const [data, setData] = useState<DiemDen[]>([
    {
      id: '1',
      ten: 'Đà Nẵng',
      diaDiem: 'Miền Trung',
      loaiHinh: 'bien',
      giaThamKhao: 3000000,
      danhGia: 5,
      hinhAnh: 'https://vcdn1-dulich.vnecdn.net/2022/06/03/cau-vang-6631-1654247291.jpg',
      moTa: 'Cầu Vàng và biển Mỹ Khê',
      phiAnUong: 1000000, phiDiChuyen: 500000, phiLuuTru: 1500000
    }
  ]);

  const showModal = (record?: DiemDen) => {
    if (record) {
      setEditingKey(record.id);
      form.setFieldsValue(record);
    } else {
      setEditingKey(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (editingKey) {
        setData(data.map(item => item.id === editingKey ? { ...item, ...values } : item));
        message.success('Cập nhật điểm đến thành công!');
      } else {
        const newItem = { ...values, id: Date.now().toString() };
        setData([...data, newItem]);
        message.success('Thêm điểm đến mới thành công!');
      }
      setIsModalVisible(false);
    });
  };

  const handleDelete = (id: string) => {
    setData(data.filter(item => item.id !== id));
    message.warning('Đã xóa điểm đến.');
  };

  const columns = [
    { title: 'Tên điểm đến', dataIndex: 'ten', key: 'ten' },
    { title: 'Địa điểm', dataIndex: 'diaDiem', key: 'diaDiem' },
    { title: 'Giá (VNĐ)', dataIndex: 'giaThamKhao', key: 'giaThamKhao', render: (v: number) => v.toLocaleString() },
    { title: 'Rating', dataIndex: 'danhGia', key: 'danhGia', render: (v: number) => <Rate disabled defaultValue={v} style={{ fontSize: 12 }} /> },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: DiemDen) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '10px' }}>
      <Title level={3}><LineChartOutlined /> Báo cáo thống kê (Tháng 4/2026)</Title>
      
      <Row gutter={[16, 16]} style={{ marginBottom: 30 }}>
        <Col span={6}>
          <Card><Statistic title="Lượt lịch trình" value={128} prefix={<LineChartOutlined />} color="blue" /></Card>
        </Col>
        <Col span={6}>
          <Card><Statistic title="Điểm đến phổ biến" value={'Đà Nẵng'} prefix={<EnvironmentOutlined />} /></Card>
        </Col>
        <Col span={6}>
          <Card><Statistic title="Doanh thu (VNĐ)" value={452000000} precision={0} prefix={<DollarCircleOutlined />} valueStyle={{ color: '#3f8600' }} /></Card>
        </Col>
        <Col span={6}>
          <Card><Statistic title="Tỷ lệ lấp đầy" value={85.5} suffix="%" /></Card>
        </Col>
      </Row>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={4}>Danh sách quản lý điểm đến</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>Thêm điểm đến</Button>
      </div>

      <Table dataSource={data} columns={columns} rowKey="id" />

      <Modal
        title={editingKey ? "Sửa điểm đến" : "Thêm điểm đến mới"}
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="ten" label="Tên điểm đến" rules={[{ required: true }]}><Input /></Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="diaDiem" label="Địa điểm"><Input /></Form.Item>
            </Col>
          </Row>
          <Form.Item name="moTa" label="Mô tả chi tiết"><Input.TextArea rows={3} /></Form.Item>
          <Row gutter={16}>
            <Col span={6}><Form.Item name="phiAnUong" label="Phí ăn uống"><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
            <Col span={6}><Form.Item name="phiDiChuyen" label="Phí di chuyển"><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
            <Col span={6}><Form.Item name="phiLuuTru" label="Phí lưu trú"><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
            <Col span={6}><Form.Item name="giaThamKhao" label="Tổng giá gốc"><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="danhGia" label="Rating (1-5)"><Rate /></Form.Item></Col>
            <Col span={12}>
              <Form.Item label="Hình ảnh điểm đến">
                <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Chọn ảnh để upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default QuanTriAdmin;