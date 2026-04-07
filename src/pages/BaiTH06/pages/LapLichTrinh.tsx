import React, { useMemo } from 'react';
import { List, Button, Typography, Card, Empty, Space, Tag, Divider, Alert, Tooltip } from 'antd';
import { DeleteOutlined, ClockCircleOutlined, CarOutlined, DollarCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import { DiemDen } from '../types/DuLich';

const { Title, Text } = Typography;

interface Props {
  data: DiemDen[];
  setData: React.Dispatch<React.SetStateAction<DiemDen[]>>;
}

const LapLichTrinh: React.FC<Props> = ({ data = [], setData }) => { // Thêm = [] ở đây để chống undefined

  const handleXoaDiem = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  // 1. Tính toán tổng ngân sách - Thêm kiểm tra data?.
  const tongNganSach = useMemo(() => {
    if (!data) return 0;
    return data.reduce((sum, item) => sum + (item.phiAnUong + item.phiDiChuyen + item.phiLuuTru), 0);
  }, [data]);

  // 2. Logic chia ngày
  const diemTheoNgay = useMemo(() => {
    if (!data) return [];
    const pages = [];
    for (let i = 0; i < data.length; i += 2) {
      pages.push(data.slice(i, i + 2));
    }
    return pages;
  }, [data]);

  // Kiểm tra nếu không có dữ liệu
  if (!data || data.length === 0) {
    return <Empty style={{ marginTop: 100 }} description="Lịch trình trống. Hãy thêm điểm đến từ tab Khám phá!" />;
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Title level={3}><CalendarOutlined /> Kế hoạch du lịch chi tiết</Title>

      <Alert
        type="info"
        showIcon
        message={<Text strong>Tổng quan chuyến đi</Text>}
        description={
          <Space direction="vertical">
            <Text>Tổng chi phí dự kiến: <Text type="danger" strong>{tongNganSach.toLocaleString()} VNĐ</Text></Text>
            <Text>Ước tính thời gian tham quan: <Text strong>{data.length * 3} tiếng</Text></Text>
          </Space>
        }
        style={{ marginBottom: 24 }}
      />

      {diemTheoNgay.map((ngayData, indexNgay) => (
        <div key={indexNgay} style={{ marginBottom: 30 }}>
          <Divider orientation="left">
            <Tag color="blue" style={{ fontSize: 16, padding: '5px 15px' }}>NGÀY {indexNgay + 1}</Tag>
          </Divider>

          <List
            dataSource={ngayData}
            renderItem={(item, indexTrongNgay) => {
              const realIndex = indexNgay * 2 + indexTrongNgay;
              return (
                <div key={item.id}>
                  <Card hoverable style={{ marginBottom: 10, borderRadius: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Space>
                        <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#1890ff', color: '#fff', textAlign: 'center', lineHeight: '30px', fontWeight: 'bold' }}>
                          {indexTrongNgay + 1}
                        </div>
                        <div>
                          <Text strong style={{ fontSize: 16 }}>{item.ten}</Text>
                          <br />
                          <Text type="secondary">{item.diaDiem}</Text>
                        </div>
                      </Space>
                      <Space size="large">
                        <div style={{ textAlign: 'right' }}>
                           <Text type="warning" strong>{(item.phiAnUong + item.phiLuuTru).toLocaleString()}đ</Text>
                           <br />
                           <Text size="small" type="secondary"><ClockCircleOutlined /> 2h</Text>
                        </div>
                        <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleXoaDiem(realIndex)} />
                      </Space>
                    </div>
                  </Card>
                  {indexTrongNgay < ngayData.length - 1 && (
                    <div style={{ marginLeft: 60, padding: '10px 0', borderLeft: '2px dashed #d9d9d9' }}>
                      <Tag icon={<CarOutlined />} style={{ marginLeft: 20 }}>Di chuyển: ~45p</Tag>
                    </div>
                  )}
                </div>
              );
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default LapLichTrinh;