import React, { useState } from "react";
import BangCauLacBo from "./components/BangCauLacBo";
import BangDonDangKy from "./components/BangDonDangKy";
import BangThanhVien from "./components/BangThanhVien";
import BieuDoThongKe from "./components/BieuDoThongKe";

export default function App() {
  const [menu, setMenu] = useState("clb");
  const [filterClubName, setFilterClubName] = useState<string | null>(null);
  // 1. Tạo hàm xử lý lưu đơn
const handleSaveRegistration = (formData: any) => {
  setRegistrations((prev) => {
    // Nếu là sửa (đã có id)
    if (formData.id) {
      return prev.map((item) => (item.id === formData.id ? formData : item));
    }
    // Nếu là thêm mới (chưa có id)
    return [...prev, { ...formData, id: Date.now(), history: [] }];
  });
};

  // QUẢN LÝ DANH SÁCH CLB TẠI ĐÂY
  const [clubs, setClubs] = useState<any[]>([
    { id: 1, name: "IT Club", date: "2020-01-01", description: "<b>CLB công nghệ</b> hàng đầu", president: "Nguyễn Văn A", active: true, image: "" },
    { id: 2, name: "Marketing", date: "2021-05-10", description: "CLB Truyền thông", president: "Trần Thị B", active: true, image: "" }
  ]);

  const [registrations, setRegistrations] = useState<any[]>([]);
  const handleViewMembers = (clubName: string) => {
    setFilterClubName(clubName);
    setMenu("tv");
  };

  const handleUpdateStatus = (ids: number[], newStatus: string, reason: string = "") => {
    const time = new Date().toLocaleString("vi-VN");
    setRegistrations(prev => prev.map(item => {
      if (ids.includes(item.id)) {
        const log = `Admin đã ${newStatus === "Approved" ? "Duyệt" : "Từ chối"} lúc ${time} ${reason ? `(${reason})` : ""}`;
        return { ...item, status: newStatus, history: [...(item.history || []), log] };
      }
      return item;
    }));
  };

  const handleMoveClub = (ids: number[], newClubName: string) => {
    setRegistrations(prev => prev.map(reg => ids.includes(reg.id) ? { ...reg, club: newClubName } : reg));
  };

  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh", fontFamily: "Arial" }}>
      <div style={{ display: "flex", backgroundColor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", position: "sticky", top: 0, zIndex: 10 }}>
        <MenuItem active={menu === "clb"} label="CLB" onClick={() => { setMenu("clb"); setFilterClubName(null); }} />
        <MenuItem active={menu === "don"} label="Đơn đăng ký" onClick={() => setMenu("don")} />
        <MenuItem active={menu === "tv"} label="Thành viên" onClick={() => { setMenu("tv"); setFilterClubName(null); }} />
        <MenuItem active={menu === "tk"} label="Thống kê" onClick={() => setMenu("tk")} />
      </div>

      <div style={{ padding: "20px" }}>
        {menu === "clb" && (
          <BangCauLacBo 
            clubs={clubs} 
            setClubs={setClubs} 
            onViewMembers={handleViewMembers} 
          />
        )}
        {menu === "don" && (
          <BangDonDangKy 
            data={registrations} 
            availableClubs={clubs.map(c => c.name)} 
            onAction={handleUpdateStatus} 
            onSave={handleSaveRegistration}
          />
        )}
        {menu === "tv" && (
          <BangThanhVien 
            data={registrations} 
            clubs={clubs} 
            onUpdateMembers={handleMoveClub} 
            filterClub={filterClubName} 
          />
        )}
        {menu === "tk" && (
          <BieuDoThongKe 
            clubs={clubs} 
            registrations={registrations} 
          />
        )}
      </div>
    </div>
  );
}

function MenuItem({ active, label, onClick }: any) {
  return (
    <div onClick={onClick} style={{ padding: "15px 25px", cursor: "pointer", fontWeight: "bold", color: active ? "#007bff" : "#666", borderBottom: active ? "3px solid #007bff" : "3px solid transparent" }}>
      {label}
    </div>
  );
}