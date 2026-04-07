import React from 'react';
import { List, Button, Avatar, Typography } from 'antd';
import { DeleteOutlined, MenuOutlined } from '@ant-design/icons';
import { DiemDen } from '../types/DuLich';

const { Text } = Typography;

interface Props {
  item: DiemDen;
  onXoa: (id: string) => void;
}

const DanhSachLichTrinh: React.FC<Props> = ({ item, onXoa }) => {
  return (
    <List.Item
      actions={[
        <Button 
          danger 
          icon={<DeleteOutlined />} 
          onClick={() => onXoa(item.id)} 
        />
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar shape="square" size={64} src={item.hinhAnh} />}
        title={<Text strong>{item.ten}</Text>}
        description={
          <div>
            <Text type="secondary">{item.diaDiem}</Text>
            <br />
            <Text type="danger">Dự kiến: {item.phiAnUong + item.phiDiChuyen + item.phiLuuTru} VNĐ</Text>
          </div>
        }
      />
      <MenuOutlined style={{ cursor: 'grab', color: '#bfbfbf' }} />
    </List.Item>
  );
};

export default DanhSachLichTrinh;