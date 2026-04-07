import React, { useState } from 'react';
import { Card, Rate, Tag, Button, Typography, message } from 'antd';
import { PlusOutlined, EnvironmentOutlined, CheckOutlined } from '@ant-design/icons';
import { DiemDen } from '../types/DuLich';

const { Title } = Typography;

interface Props {
  duLieu: DiemDen;
  onXemChiTiet: (item: DiemDen) => void;
  onThemDiem: (item: DiemDen) => void;
}

const TheDiemDen: React.FC<Props> = ({ duLieu, onXemChiTiet, onThemDiem }) => {
  const [daThem, setDaThem] = useState(false);

  const handleThem = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (daThem) return;

    onThemDiem(duLieu);
    setDaThem(true);

    message.success("Đã thêm vào lịch trình ✅");
  };

  return (
    <Card
      hoverable
      style={{ 
        width: '100%', 
        borderRadius: 12, 
        overflow: 'hidden', 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}
      cover={
        <img 
          alt={duLieu.ten} 
          src={duLieu.hinhAnh} 
          style={{ height: 200, objectFit: 'cover', cursor: 'pointer' }} 
          onClick={() => onXemChiTiet(duLieu)} 
        />
      }
      actions={[
        <Button 
          type={daThem ? "default" : "primary"}
          danger={!daThem}
          icon={daThem ? <CheckOutlined /> : <PlusOutlined />} 
          style={{ width: '90%', height: 40, borderRadius: 8, fontWeight: 'bold' }}
          onClick={handleThem}
          disabled={daThem}
        >
          {daThem ? "ĐÃ THÊM ✔" : "THÊM VÀO LỊCH TRÌNH"}
        </Button>
      ]}
    >
      <div style={{ flex: 1 }}>
        <Tag color="blue" style={{ marginBottom: 8 }}>
          {duLieu.loaiHinh === 'bien' ? 'Vùng Biển' : duLieu.loaiHinh === 'nui' ? 'Vùng Núi' : 'Thành Phố'}
        </Tag>
        
        <Title level={4} style={{ margin: '0 0 8px 0', fontSize: 18 }}>
          {duLieu.ten}
        </Title>
        
        <div style={{ marginBottom: 8, color: '#8c8c8c' }}>
          <EnvironmentOutlined /> {duLieu.diaDiem}
        </div>

        <div style={{ fontSize: 20, fontWeight: 'bold', color: '#ff4d4f', marginBottom: 8 }}>
          {duLieu.giaThamKhao.toLocaleString()} VNĐ
        </div>

        <Rate disabled defaultValue={duLieu.danhGia} style={{ fontSize: 12 }} />
      </div>
    </Card>
  );
};

export default TheDiemDen;