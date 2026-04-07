import React from 'react';
import { Card, Progress, Typography, Space } from 'antd';

const { Text } = Typography;

interface Props {
  tenHangMuc: string;
  phanTram: number;
  mauSac: string;
}

const BieuDoChiPhi: React.FC<Props> = ({ tenHangMuc, phanTram, mauSac }) => {
  return (
    <Card size="small" style={{ marginBottom: 12 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text strong>{tenHangMuc}</Text>
          <Text>{phanTram}%</Text>
        </div>
        <Progress percent={phanTram} strokeColor={mauSac} showInfo={false} />
      </Space>
    </Card>
  );
};

export default BieuDoChiPhi;