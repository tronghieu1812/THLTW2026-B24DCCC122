import React, { useState } from 'react'; // Thêm useState vào đây
import { Tabs, Typography } from 'antd';
import { 
  SearchOutlined, 
  FormOutlined, 
  BarChartOutlined, 
  SettingOutlined 
} from '@ant-design/icons';

import TrangChu from './pages/TrangChu';
import LapLichTrinh from './pages/LapLichTrinh';
import QuanLyNganSach from './pages/QuanLyNganSach';
import QuanTriAdmin from './pages/QuanTriAdmin';
import { DiemDen } from './types/DuLich'; // Import kiểu dữ liệu

const { TabPane } = Tabs;
const { Title } = Typography;

const BaiTH06: React.FC = () => {
  // 1. Khai báo State để lưu trữ danh sách điểm đến đã chọn
  const [lichTrinh, setLichTrinh] = useState<DiemDen[]>([]);

  // 2. Hàm xử lý khi nhấn "Thêm" từ TrangChu
  const handleThemDiem = (item: DiemDen) => {
    setLichTrinh([...lichTrinh, item]);
  };

  return (
    <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', minHeight: '80vh' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 30, color: '#ff4d4f' }}>
        HỆ THỐNG LẬP KẾ HOẠCH DU LỊCH
      </Title>

      <Tabs defaultActiveKey="1" type="line" size="large">
        <TabPane 
          tab={
            <span>
              <SearchOutlined />
              Khám phá
            </span>
          } 
          key="1"
        >
          <div style={{ marginTop: 20 }}>
            {/* Truyền hàm handleThemDiem xuống TrangChu */}
            <TrangChu onThemDiem={handleThemDiem} />
          </div>
        </TabPane>

        <TabPane 
          tab={
            <span>
              <FormOutlined />
              Lập lịch trình
            </span>
          } 
          key="2"
        >
          <div style={{ marginTop: 20 }}>
            {/* Truyền dữ liệu và hàm xóa xuống LapLichTrinh */}
            <LapLichTrinh
              data={lichTrinh}
              setData={setLichTrinh} 
            />
          </div>
        </TabPane>

        <TabPane 
          tab={
            <span>
              <BarChartOutlined />
              Quản lý ngân sách
            </span>
          } 
          key="3"
        >
          <div style={{ marginTop: 20 }}>
            {/* Truyền lichTrinh xuống để tính toán tiền trong tab ngân sách */}
            <QuanLyNganSach lichTrinh={lichTrinh} />
          </div>
        </TabPane>

        <TabPane 
          tab={
            <span>
              <SettingOutlined />
              Trang quản trị
            </span>
          } 
          key="4"
        >
          <div style={{ marginTop: 20 }}>
            <QuanTriAdmin />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default BaiTH06;