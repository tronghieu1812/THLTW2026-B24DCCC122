import { useState } from "react";
import NhanVien from "./components/NhanVien";
import DichVu from "./components/DichVu";
import DatLich from "./components/DatLichForm";
import LichHenList from "./components/LichHenList";
import DanhGia from "./components/DanhGia";
import ThongKe from "./components/ThongKe";

const BaiTH03 = () => {
  const [nhanVienList, setNhanVienList] = useState<any[]>([]);
  const [dichVuList, setDichVuList] = useState<any[]>([]); // 🔥 THÊM
  const [lichList, setLichList] = useState<any[]>([]);

  // 🎨 style card
  const cardStyle = {
    background: "#fff",
    padding: 15,
    borderRadius: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    flex: 1,
    minWidth: 300,
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📅 App Đặt Lịch</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        
        {/* Nhân viên */}
        <div style={cardStyle}>
          <NhanVien setNhanVienList={setNhanVienList} />
        </div>

        {/* Dịch vụ */}
        <div style={cardStyle}>
          <DichVu setDichVuList={setDichVuList} /> {/* 🔥 FIX */}
        </div>

        {/* Đặt lịch */}
        <div style={cardStyle}>
          <DatLich
            nhanVienList={nhanVienList}
            dichVuList={dichVuList} // 🔥 THÊM
            lichList={lichList}
            setLichList={setLichList}
          />
        </div>

        {/* Lịch hẹn */}
        <div style={cardStyle}>
          <LichHenList
            lichList={lichList}
            setLichList={setLichList}
            nhanVienList={nhanVienList}
          />
        </div>

        {/* Đánh giá */}
        <div style={cardStyle}>
          <DanhGia nhanVienList={nhanVienList} />
        </div>

        {/* Thống kê */}
        <div style={cardStyle}>
          <ThongKe
            lichList={lichList}
            nhanVienList={nhanVienList}
          />
        </div>

      </div>
    </div>
  );
};

export default BaiTH03;