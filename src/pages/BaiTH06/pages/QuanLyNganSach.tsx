import React, { useMemo } from 'react';
import { Table, Typography, Alert, Row, Col, Statistic, Card, Progress, Space, Empty } from 'antd';
import { DollarOutlined, WarningOutlined, CheckCircleOutlined, PieChartOutlined } from '@ant-design/icons';
import { DiemDen } from '../types/DuLich';

const { Title, Text } = Typography;

interface Props {
  lichTrinh: DiemDen[];
}

const QuanLyNganSach: React.FC<Props> = ({ lichTrinh }) => {
  // 1. Định mức ngân sách cho phép (Giả sử là 10 triệu)
  const DINH_MUC = 10000000;

  // 2. Tính toán số liệu thực tế từ lichTrinh
  const tongAnUong = useMemo(() => lichTrinh.reduce((sum, item) => sum + item.phiAnUong, 0), [lichTrinh]);
  const tongDiChuyen = useMemo(() => lichTrinh.reduce((sum, item) => sum + item.phiDiChuyen, 0), [lichTrinh]);
  const tongLuuTru = useMemo(() => lichTrinh.reduce((sum, item) => sum + item.phiLuuTru, 0), [lichTrinh]);
  const tongThucTe = tongAnUong + tongDiChuyen + tongLuuTru;

  // Kiểm tra trạng thái ngân sách
  const isVuotNganSach = tongThucTe > DINH_MUC;
  const phanTramSuDung = Math.min(Math.round((tongThucTe / DINH_MUC) * 100), 100);

  // 3. Cấu trúc dữ liệu cho bảng
  const dataTable = [
    { key: '1', hangMuc: 'Ăn uống', giaTri: tongAnUong, color: '#f5222d' },
    { key: '2', hangMuc: 'Di chuyển', giaTri: tongDiChuyen, color: '#1890ff' },
    { key: '3', hangMuc: 'Lưu trú', giaTri: tongLuuTru, color: '#722ed1' },
  ];

  const columns = [
    { title: 'Hạng mục chi phí', dataIndex: 'hangMuc', key: 'hangMuc' },
    { 
      title: 'Số tiền (VNĐ)', 
      dataIndex: 'giaTri', 
      key: 'giaTri', 
      render: (val: number) => <Text strong>{val.toLocaleString()}</Text> 
    },
    {
      title: 'Tỷ trọng',
      key: 'tyTrong',
      render: (_: any, record: any) => (
        <Progress 
          percent={tongThucTe > 0 ? Math.round((record.giaTri / tongThucTe) * 100) : 0} 
          size="small" 
          strokeColor={record.color}
        />
      )
    }
  ];

  if (lichTrinh.length === 0) {
    return <Empty description="Chưa có dữ liệu. Hãy thêm điểm đến để quản lý ngân sách!" style={{ marginTop: 100 }} />;
  }

  return (
    <div style={{ padding: '10px' }}>
      <Title level={3}><PieChartOutlined /> Phân bổ ngân sách chi tiết</Title>

      {/* Cảnh báo Alert theo yêu cầu */}
      {isVuotNganSach ? (
        <Alert
          message="Cảnh báo vượt ngân sách!"
          description={`Tổng chi phí (${tongThucTe.toLocaleString()}đ) đã vượt hạn mức cho phép (${DINH_MUC.toLocaleString()}đ).`}
          type="error"
          showIcon
          icon={<WarningOutlined />}
          style={{ marginBottom: 24 }}
        />
      ) : (
        <Alert
          message="Ngân sách hợp lý"
          description="Bạn vẫn đang kiểm soát tốt chi phí chuyến đi trong tầm giá 10.000.000đ."
          type="success"
          showIcon
          icon={<CheckCircleOutlined />}
          style={{ marginBottom: 24 }}
        />
      )}

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={8}>
          <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Statistic 
              title="Tổng thực tế" 
              value={tongThucTe} 
              suffix="VNĐ" 
              prefix={<DollarOutlined />}
              valueStyle={{ color: isVuotNganSach ? '#cf1322' : '#3f8600' }} 
            />
          </Card>
        </Col>
        <Col xs={24} md={16}>
          <Card title="Tiến độ sử dụng ngân sách" bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Progress 
              percent={phanTramSuDung} 
              status={isVuotNganSach ? 'exception' : 'active'}
              strokeColor={{ '0%': '#108ee9', '100%': isVuotNganSach ? '#ff4d4f' : '#87d068' }}
            />
            <div style={{ textAlign: 'right', marginTop: 5 }}>
               Hạn mức: <Text strong>{DINH_MUC.toLocaleString()} VNĐ</Text>
            </div>
          </Card>
        </Col>
      </Row>

      <Table 
        dataSource={dataTable} 
        columns={columns} 
        pagination={false} 
        bordered 
        summary={() => (
          <Table.Summary.Row style={{ background: '#fafafa' }}>
            <Table.Summary.Cell index={0}><Text strong>Tổng cộng</Text></Table.Summary.Cell>
            <Table.Summary.Cell index={1}><Text type="danger" strong>{tongThucTe.toLocaleString()} VNĐ</Text></Table.Summary.Cell>
            <Table.Summary.Cell index={2}></Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
    </div>
  );
};

export default QuanLyNganSach;